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
        else
            @nekos = Neko.all
            render :index
        end
    end

    def show
        @neko = Neko.find(params[:id])
        render :show
    end

    def update
        @neko = Neko.find(params[:id])

        if @neko.id == current_user.id && @neko.update!(neko_params)
            if params[:neko].has_key?(:location)
                location = Location.find_by(name: params[:neko][:location]) || 
                            Location.create(name: params[:neko][:location])
                @neko.location = location 
                @neko.save!
            end
            render :show
        elsif @neko.id != current_user.id
            render json: ["Silly you. You cannot make changes to another neko's profile!"], status: 404
        else
            render json: @neko.errors.full_messages, status: 422
        end

    end

    private
    def neko_params
        params.require(:neko).permit(:username, :email, :password, :fname, :lname, :birthday, :gender)
    end
end
