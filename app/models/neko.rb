# == Schema Information
#
# Table name: nekos
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  fname           :string           not null
#  profile_picture :string
#  location_id     :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  birthday        :date             not null
#  gender          :string           not null
#  cover_photo     :string
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
