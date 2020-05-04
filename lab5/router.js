function route(handle, pathname, response, postData)
{
    console.log("Route request for " + pathname);
    if (typeof handle[pathname] == 'function')
    {
        handle[pathname](response, postData);
    }
    else
    {
        console.log("No method found for " + pathname);
        handle["notFound404"](response);
    }
}

exports.route = route;