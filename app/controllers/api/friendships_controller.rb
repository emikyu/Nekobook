class Api::FriendshipsController < ApplicationController
    before_action :ensure_logged_in

    def create
        # without loss of generality, assumer current_user has to be friend_one
        friend_one_id, friend_two_id = params[:friend_one_id].to_i, params[:friend_two_id].to_i

        # check to make sure that the friend_request exists
        friend_request = FriendRequest.find_by(requestee_id: :friend_one_id, requester_id: :friend_two_id)

        if friend_request && current_user.id == friend_one_id
            # only allow current_user to accept new friends
            friendship_one = Friendship.new(friend_one_id: friend_one_id, friend_two_id: friend_two_id)

            friendship_two = Friendship.new(friend_one_id: friend_two_id, friend_two_id: friend_one_id)

            if friendship_one.save && friendship_two.save
                @neko = current_user
                render "api/nekos/show_current"
            else
                render json: friendship_one.errors.full_messages + friendship_two.errors.full_messages, status: 422
            end
        elsif current_user.id != friend_one_id
            render json: ["Only current user can accept friend requests!"], status: 404
        else
            render json: ["No friend request exists."], status: 404
        end
    end

    def destroy
        # without loss of generality, assumer current_user has to be friend_one
        friend_one_id, friend_two_id = params[:friend_one_id].to_i, params[:friend_two_id].to_i

        friendship_one = Friendship.find(friend_one_id: friend_one_id, friend_two_id: friend_two_id)

        friendship_two = Friendship.find(friend_one_id: friend_two_id, friend_two_id: friend_one_id)

        if current_user.id != friend_one_id
            render json: ["Only current user can unfriend!"], status: 404
        elsif !(friendship_one && friendship_two)
            render json: ["No existing friendship to unfriend!"], status: 404
        else
            friendship_one.destroy
            friendship_two.destroy
            @neko = current_user
            render "api/nekos/show_current"
        end
    end
end
