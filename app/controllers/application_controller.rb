class ApplicationController < ActionController::Base
    helper_method :logged_in?, :current_user

    def current_user
        @current_user ||= Neko.find_by(session_token: session[:session_token])
    end

    def ensure_logged_in
        redirect_to root_url unless logged_in?
    end

    def ensure_logged_out
        redirect_to root_url if logged_in?
    end

    def logged_in?
        !!current_user
    end

    def log_in!(user)
        session[:session_token] = user.reset_session_token!
    end

    def log_out!
        current_user.reset_session_token!
        @current_user = nil
        session[:session_token] = nil
    end
end
