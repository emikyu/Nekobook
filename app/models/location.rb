class Location < ApplicationRecord
    validates :name, presence: true
    
    has_many :nekos
end