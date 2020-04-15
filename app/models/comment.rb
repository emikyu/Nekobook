# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  author_id  :integer          not null
#  post_id    :integer          not null
#  parent_id  :integer          not null
#  body       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    validates :body, presence: true

    belongs_to :author, foreign_key: :author_id, class_name: :Neko

    belongs_to :post, foreign_key: :post_id, class_name: :Post
    has_one :wall, through: :post, source: :wall

    belongs_to :parent, foreign_key: :parent_id, optional: true, class_name: :Comment
    has_many :children, foreign_key: :parent_id, class_name: :Comment

end
