class Api::SessionsController < ApplicationController
    def create
        @neko = Neko.find_by_credentials(params[:neko][:email], params[:neko][:password])
        if @neko
            log_in!(@neko)
            redirect_to api_neko_url(@neko)
        else
            render json: ["Invalid email/password. Please try again!"], status: 422
        end
    end

    def destroy
        if current_user
            log_out!
        else
            render json: ["There is no current user to log out!"], status: 404
        end
    end
end
