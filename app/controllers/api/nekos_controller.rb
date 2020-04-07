class Api::NekosController < ApplicationController
    before_action :ensure_logged_out, only: [:create]

    def create
        @neko = Neko.new(neko_params)
        if @neko.save
            log_in!(@neko)
            render :show
        else
            render json: @neko.errors.full_messages, status: 422
        end
    end

    def show
        if params.has_key?(:username)
            @neko = Neko.find_by(username: params[:username])
        else
            @neko = Neko.find(params[:id])
        end

        render :show
    end

    private
    def neko_params
        params.require(:neko).permit(:username, :email, :password, :name, :profile_picture, :birthday, :location_id, :gender)
    end
end
