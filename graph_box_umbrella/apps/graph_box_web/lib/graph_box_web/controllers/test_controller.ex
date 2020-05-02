defmodule GraphBoxWeb.TestController do
  use GraphBoxWeb, :controller

  def index(conn, _params) do
    json(conn, %{value: "12"})
  end
end
