class Api::NekosController < ApplicationController
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
        @neko = Neko.find(params[:id])
        render :show
    end

    private
    def neko_params
        params.require(:neko).permit(:username, :email, :password, :name, :profile_picture, :birthday, :location_id)
    end
end
