class Api::CatsController < ApplicationController
  #authenticate_user! is a devise_token_auth method
  before_action :authenticate_user!, except: [:everyone]
  
  # no checking token
  # no current_user
  def everyone
    render json:"You all can see this"
  end

  # checks token, 
  # if token valid set current_user to the user whos token that is
  # if not valid 401 error
  def index
    # grab the 'current_user' (the user who sent a valid token)
    liked_cats_ids = current_user.liked_cats
    # passing the liked_cats array an array of number
    render json: User.unliked_cats(liked_cats_ids)
  end

    # checks token, 
  # if token valid set current_user to the user whos token that is
  # if not valid 401 error
  def my_cats
    # grab the 'current_user' (the user who sent a valid token)
    liked_cats_ids = current_user.liked_cats
    # passing the liked_cats array an array of number
    render json: User.liked(liked_cats_ids)
  end


  # checks token, 
  # if token valid set current_user
  # if not valid 401 error

  # get called when user likes a cat
  def update
    # pushing the id from params to the liked_cats array
    current_user.liked_cats.push( params[:id].to_i)
    # update user to DB
    current_user.save
  end
end
