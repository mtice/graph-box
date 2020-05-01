defmodule GraphBoxWeb.PageController do
  use GraphBoxWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
