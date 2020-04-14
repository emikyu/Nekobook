# == Schema Information
#
# Table name: friendships
#
#  id            :bigint           not null, primary key
#  friend_one_id :integer          not null
#  friend_two_id :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Friendship < ApplicationRecord
    validates :friend_one_id, :friend_two_id, presence: true
    validates :friend_one_id, uniqueness: { scope: :friend_two_id, message: "already friended" }

    belongs_to :friend_one, foreign_key: :friend_one_id, class_name: :Neko
    belongs_to :friend_two, foreign_key: :friend_two_id, class_name: :Neko


end
