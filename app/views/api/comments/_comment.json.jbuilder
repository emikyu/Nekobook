json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at

if comment.parent_id
    json.extract! comment, :parent_id
end

if comment.child_ids
    json.extract! comment, :child_ids
end