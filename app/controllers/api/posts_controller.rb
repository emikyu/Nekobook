class Api::PostsController < ApplicationController
    before_action :ensure_logged_in

    def index
        @neko = Neko.find(params[:neko_id])

        if params[:index_type] == 'authored'
            @posts = @neko.authored_posts
            render :index
        elsif params[:index_type] == 'wall'
            @posts = @neko.wall_posts
            render :index
        else
            render json: ["Need to specify type of posts to fetch, either authored posts or wall posts."], status: 404
        end

        # @posts = Post.all
        # render :index
    end

    def show
        @post = Post.find(params[:id])
        render :show
    end

    def create
        author_id, wall_id = params[:post][:author_id].to_i, params[:post][:wall_id].to_i
        if current_user.id == author_id && (current_user.id == wall_id || current_user.friend_ids.include?(wall_id))
            @post = Post.new(post_params)
            if @post.save
                render :show
            else
                render json: @post.errors.full_messages, status: 422
            end
        elsif current_user.id != author_id
            render json: ["Only current user can create post."], status: 404
        else
            render json: "Current user can only post on their own or their friends' walls."
        end
    end

    def update
        @post = Post.find(params[:id])
        if current_user.id == @post.author_id
            if @post.update!(post_params)
                render :show
            else
                render json: @post.errors.full_messages, status: 404
            end
        else
            render json: ["Current user can only edit their own post."], status: 404
        end
    end

    def destroy
        @post = Post.find(params[:id])
        if current_user.id == @post.author_id || current_user.id == @post.wall_id
            @post.destroy
            render :show
        else
            render json: ["Current user can only delete their own post/posts on their wall."], status: 404
        end
    end

    private
    def post_params
        params.require(:post).permit(:author_id, :body, :wall_id)
    end

end
