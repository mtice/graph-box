defmodule GraphBox.Repo do
  use Ecto.Repo,
    otp_app: :graph_box,
    adapter: Ecto.Adapters.Postgres
end
