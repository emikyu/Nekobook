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

        if @neko.update!(neko_params)
            render :show
        elsif @neko
            render json: @neko.errors.full_messages, status: 422
        end

    end

    private
    def neko_params
        params.require(:neko).permit(:username, :email, :password, :fname, :lname, :profile_picture, :birthday, :location_id, :gender, :cover_photo)
    end
end
