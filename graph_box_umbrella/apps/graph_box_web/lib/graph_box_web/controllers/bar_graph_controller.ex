defmodule GraphBoxWeb.BarGraphController do
  use GraphBoxWeb, :controller

  def index(conn, _params) do
    json(conn, %{
      type: "bar-graph",
      name: "People eaten by birds",
      max: 110,
      horizontal_name: "year",
      vertical_name: "deaths",
      vertical_delimiter: 10,
      bars: [
        %{
          year: "2010",
          value: 20
        },
        %{
          year: "2012",
          value: 36
        },
        %{
          year: "2014",
          value: 52
        }
      ]
    })
  end
end
