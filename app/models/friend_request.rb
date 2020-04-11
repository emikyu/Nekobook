# == Schema Information
#
# Table name: friend_requests
#
#  id              :bigint           not null, primary key
#  requester_id    :integer          not null
#  requestee_id    :integer          not null
#  request_message :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class FriendRequest < ApplicationRecord
    validates :requestee_id, uniqueness: { scope: :requester_id,
        message: "already sent friend request to requestee" }

    belongs_to :requestee, foreign_key: :requestee_id, class_name: :Neko
    belongs_to :requester, foreign_key: :requester_id, class_name: :Neko
    
end
