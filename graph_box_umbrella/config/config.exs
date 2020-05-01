# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :graph_box,
  ecto_repos: [GraphBox.Repo]

config :graph_box_web,
  ecto_repos: [GraphBox.Repo],
  generators: [context_app: :graph_box]

# Configures the endpoint
config :graph_box_web, GraphBoxWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "nm1+5cXL5G9BpT1XWA2mpnuum+E3y0sjUfjcN0Zw2krhhDSiRqkA5lS4lkWI+Tmw",
  render_errors: [view: GraphBoxWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: GraphBox.PubSub,
  live_view: [signing_salt: "A/cgXHWb"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
