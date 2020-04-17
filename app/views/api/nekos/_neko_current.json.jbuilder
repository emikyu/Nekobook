json.extract! neko, :id, :email, :username, :fname, :lname, :birthday, :location_id, :gender, :bio
# debugger
json.profile_picture neko.profile_picture.attached? ? url_for(neko.profile_picture) : ""
json.cover_photo neko.cover_photo.attached? ? url_for(neko.cover_photo) : ""
json.extract! neko, :requester_ids, :requestee_ids, :friend_ids, :authored_post_ids, :wall_post_ids, :authored_comment_ids, :hidden_friends
