# frozen_string_literal: true

class User < ActiveRecord::Base

  #add this to user.rb
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

 #  in db:   t.text "liked_cats" 
  # We can't store arrays in database, 
  # but we want to treat it like in array our app
  serialize :liked_cats, Array

  def self.unliked_cats(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id NOT IN (?)", ids).order("RANDOM()")
  end

  def self.liked(ids)
    ids = ids.empty? ? [0] : ids
    Cat.where("id IN (?)", ids)
  end

end
