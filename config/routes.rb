Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
  
    resource :session, only: [:create, :destroy]
    
    resources :nekos, only: [:create, :show, :update, :index]

    resources :locations, only: [:show, :index]
  
    post 'friend_requests/:requester_id/:requestee_id', to: 'friend_requests#create', as: 'friend_requests'
    delete 'friend_requests/:requester_id/:requestee_id', to: 'friend_requests#destroy', as: 'friend_request'
    
    post 'friendships/:friend_one_id/:friend_two_id', to: 'friendships#create', as: 'frienships'
    delete 'friendships/:friend_one_id/:friend_two_id', to: 'friendships#destroy', as: 'friendship'

  end
end
