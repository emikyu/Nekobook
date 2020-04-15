class Api::CommentsController < ApplicationController
    before_action :ensure_logged_in

    def index
        @post = Post.find(params[:post_id])

        if @post
            @comments = @post.comments
            render :index
        else
            render json: ["Cannot find corresponding post!"], status: 404
        end
        
    end

    def show
        @comment = Comment.find(params[:id])
        render :show
    end

    def create
        author_id, post_id = params[:comment][:author_id].to_i, params[:comment][:post_id].to_i
        wall_id = Post.find(post_id).wall_id;

        if current_user.id == author_id && (current_user.id == wall_id || current_user.friend_ids.include?(wall_id))
            @comment = Comment.new(comment_params)
            if @comment.save
                render :show
            else
                render json: @comment.errors.full_messages, status: 422
            end
        elsif current_user.id != author_id
            render json: ["Only current user can make a comment."], status: 404
        else
            render json: ["Current user can only make a comment on their own or their friends' walls."], status: 404
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if current_user.id == @comment.author_id
            if @comment.update!(comment_params)
                render :show
            else
                render json: @comment.errors.full_messages, status: 404
            end
        else
            render json: ["Current user can only edit their own comment."], status: 404
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if current_user.id == @comment.author_id || current_user.id == @comment.wall_id
            @comment.destroy
            render :show
        else
            render json: ["Current user can only delete their own comments/comments to posts on their wall."], status: 404
        end
    end

    private
    def comment_params 
        params.require(:comment).permit(:author_id, :post_id, :parent_id, :body)
    end
end
