class Api::NekosController < ApplicationController
    before_action :ensure_logged_out, only: [:create]
    before_action :ensure_logged_in, only: [:show, :update, :index]

    def create
        @neko = Neko.new(neko_params)
        if @neko.save
            log_in!(@neko)
            render :show
        else
            render json: @neko.errors.full_messages, status: 422
        end
    end

    def index
        if params.has_key?(:username)
            @neko = Neko.find_by(username: params[:username])
            if @neko
                render :show
            else
                render json: ["Neko with username #{params[:username]} does not exist!"], status: 404
            end
        elsif params.has_key?(:query)
            names = params[:query].split(" ")
            if names.length == 1
                @nekos = Neko.where("fname ILIKE ?", "#{names[0]}%").order(:fname, :lname)
            else
                @nekos = Neko.where("fname ILIKE ? AND lname ILIKE ?", "#{names[0]}%", "#{names[1]}%").order(:fname, :lname)
            end
            render :index
        elsif params.has_key?(:neko_id)
            @neko = Neko.find(params[:neko_id].to_i)
            if params[:index_type] == 'friends'
                @nekos = @neko.friends
                render :index
            elsif params[:index_type] == 'requesters'
                @nekos = @neko.requesters
                render :index
            elsif params[:index_type] == 'requestees'
                @nekos = @neko.requestees
                render :index
            elsif params[:index_type] == 'wall'
                @nekos = @neko.wall_posters.order(created_at: :desc)
                render :index
            elsif params[:index_type] == 'newsfeed'
                @nekos = @neko.friends
                @fofs = @neko.friends_of_friends
                render :index
            elsif params[:index_type] == 'allnames'
                # sorted array of unique full names
                @names = Neko.pluck(:fname, :lname).map {|name| name.join(" ").downcase }.uniq.sort
                render json: @names
            else
                render json: ["Invalid index type!"], status: 404
            end
        else
            @nekos = Neko.all
            render :index
        end
    end

    def show
        @neko = Neko.find(params[:id])
        if current_user.id != @neko.id
            render :show
        else
            render :show_current
        end
    end

    def update
        @neko = Neko.find(params[:id])
        # debugger
        if @neko.id == current_user.id && @neko.update!(neko_params)
            # debugger
            if params[:neko].has_key?(:location)
                location = Location.find_by(name: params[:neko][:location]) || 
                            Location.create(name: params[:neko][:location])
                @neko.location = location 
                # debugger
            end
            @neko.save!
            render :show_current
        elsif @neko.id != current_user.id
            render json: ["Silly you. You cannot make changes to another neko's profile!"], status: 404
        else
            render json: @neko.errors.full_messages, status: 422
        end

    end

    private
    def neko_params
        params.require(:neko).permit(:username, :email, :password, :fname, :lname, :birthday, :bio,
                                    :gender, :cover_photo, :profile_picture, hidden_friends: [])
    end
end

