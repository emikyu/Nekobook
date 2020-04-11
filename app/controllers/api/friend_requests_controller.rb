class Api::FriendRequestsController < ApplicationController
    before_action :ensure_logged_in

    def create
        # debugger
        requester_id, requestee_id = params[:requester_id].to_i, params[:requestee_id].to_i
        # only allow current user to make friend requests
        if current_user.id == requester_id
            @friend_request = FriendRequest.new(requester_id: requester_id, requestee_id: requestee_id)
            if @friend_request.save
                @neko = current_user
                render "api/nekos/show_current"          
            else
                render json: @friend_request.errors.full_messages, status: 422
            end
        else
            render json: ["Only current user can make friend requests!"], status: 404
        end
    end

    def destroy
        requester_id, requestee_id = params[:requester_id].to_i, params[:requestee_id].to_i
        # only allow current user to accept / reject / cancel friend requests
        # debugger
        if current_user.id == requester_id || current_user.id == requestee_id
            # debugger
            @friend_request = FriendRequest.find_by(requester_id: requester_id, requestee_id: requestee_id)
            if @friend_request
                @friend_request.destroy
                @neko = current_user
                render "api/nekos/show_current"         
            else
                render json: ["No existing friend request to move!"], status: 404
            end
        else
            render json: ["Only current user can cancel/reject/accept friend requests!"], status: 404
        end
    end


    # def create
    #     if current_user.id == params[:friend_request][:requester_id];
    #         @friend_request = FriendRequest.new(friend_request_params)
    #         if @friend_request.save
    #         else
    #             render json: @friend_request.errors.full_messages, status: 422
    #         end
    #     else
    #         render json: ["Only current user can make friend requests!"], status: 404
    #     end
    # end

    # def destroy
    #     if current_user.id == params[:friend_request][:requester_id] || current_user.id == params[:friend_request][:requestee_id]
    #         @friend_request = FriendRequest.find(params[:id])
    #         @friend_request.destroy
    #     else
    #         render json: ["Only current user can cancel/reject/accept friend requests!"], status: 404
    #     end
    # end

    # private
    # def friend_request_params
    #     params.require(:friend_request).permit(:requester_id, :requestee_id)
    # end
end

