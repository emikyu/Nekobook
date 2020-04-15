# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  author_id  :integer          not null
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  wall_id    :integer          not null
#
class Post < ApplicationRecord
    validates :body, presence: true

    belongs_to :author, foreign_key: :author_id, class_name: :Neko
    belongs_to :wall, foreign_key: :wall_id, class_name: :Neko

    has_many :comments, foreign_key: :post_id, class_name: :Comment, dependent: :destroy
    
    has_many :author_friends, through: :author, source: :friends
end
