defmodule GraphBox.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      GraphBox.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: GraphBox.PubSub}
      # Start a worker by calling: GraphBox.Worker.start_link(arg)
      # {GraphBox.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: GraphBox.Supervisor)
  end
end
