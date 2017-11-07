from channels.routing import route
channel_routing = [
    route("http.request", "core.consumers.http_consumer"),
]

