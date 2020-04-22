function route(handle, pathname)
{
    console.log("Route request for " + pathname);
    if (typeof handle[pathname] == 'function')
    {
        return handle[pathname]();
    }
    else
    {
        console.log("No method found for " + pathname);
        return handle["notFound404"];
    }
}

exports.route = route;