class Contact < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :phone_number, uniqueness: true
  validates :email, uniqueness: true

end