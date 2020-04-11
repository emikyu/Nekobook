# == Schema Information
#
# Table name: nekos
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  fname           :string           not null
#  location_id     :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  birthday        :date             not null
#  gender          :string           not null
#  username        :string
#  lname           :string           not null
#

class Neko < ApplicationRecord
    has_one_attached :profile_picture
    has_one_attached :cover_photo

    validates :email, :password_digest, :session_token, :fname, :lname, :birthday, :gender, presence: true
    validates :gender, inclusion: { in: ["Male", "Female", "Custom"] }
    validates :email, :session_token, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    after_initialize :ensure_session_token
    attr_reader :password

    belongs_to :location, optional: true
    
    has_many :outgoing_friend_requests, foreign_key: :requester_id, class_name: :FriendRequest
    has_many :incoming_friend_requests, foreign_key: :requestee_id, class_name: :FriendRequest

    has_many :requestees, through: :outgoing_friend_requests, source: :requestee
    has_many :requesters, through: :incoming_friend_requests, source: :requester

    def make_friend_request(other_neko)
        unless FriendRequest.find_by(requester: self, requestee: other_neko) || FriendRequest.find_by(requestee: self, requester: other_neko)
            FriendRequest.create!(requester: self, requestee: other_neko)
        end
    end

    def cancel_friend_request(other_neko)
        friend_request = FriendRequest.find_by(requester: self, requestee: other_neko)
        friend_request.destroy! if friend_request
    end

    def accept_friend_request(other_necko)
        friend_request = FriendRequest.find_by(requester: other_neko, requestee: self)
        friend_request.destroy! if friend_request
    end

    def reject_friend_request(other_neko)
        friend_request = FriendRequest.find_by(requeser: other_neko, requestee: self)
        friend_request.destroy! if friend_request
    end


    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def self.find_by_credentials(email, password)
        user = Neko.find_by(email: email)
        return nil unless user && user.is_password?(password)
        user
    end

    def is_password?(password)
        bpass = BCrypt::Password.new(password_digest)
        bpass.is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save!
        self.session_token
    end

    private
    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
end
