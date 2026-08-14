<?php

class Router {
    private $routes = [];

    /**
     * Add a GET route
     * @param string $path Clean URL path (e.g. /vehicle/:slug)
     * @param callable|string $handler Page file or controller function
     */
    public function get($path, $handler) {
        $this->routes['GET'][$path] = $handler;
    }

    public function post($path, $handler) {
        $this->routes['POST'][$path] = $handler;
    }

    /**
     * Parse current URI and dispatch to the correct handler
     */
    public function dispatch() {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        // Normalize leading/trailing slashes
        $uri = '/' . trim($uri, '/');

        if (!isset($this->routes[$method])) {
            $this->triggerError();
            return;
        }

        foreach ($this->routes[$method] as $routePath => $handler) {
            $pattern = $this->getPattern($routePath);
            if (preg_match($pattern, $uri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                $this->execute($handler, $params);
                return;
            }
        }

        $this->triggerError();
    }

    private function getPattern($path) {
        // Convert /vehicle/:slug to a regex pattern with named capture groups
        $pattern = preg_replace('/:([a-zA-Z0-9_]+)/', '(?P<$1>[^/]+)', $path);
        return '#^' . $pattern . '$#';
    }

    private function execute($handler, $params = []) {
        // Extract params into global $_GET for backward compatibility with existing components
        foreach ($params as $key => $value) {
            $_GET[$key] = $value;
        }

        if (is_callable($handler)) {
            call_user_func($handler, $params);
        } elseif (is_string($handler) && file_exists(__DIR__ . '/../pages/' . $handler)) {
            include __DIR__ . '/../pages/' . $handler;
        } else {
            $this->triggerError();
        }
    }

    public function triggerError($code = 404) {
        http_response_code($code);
        $error_file = __DIR__ . '/../pages/error.php';
        if (file_exists($error_file)) {
            include $error_file;
        } else {
            echo "<h1>Computing Error $code</h1><p>The system could not resolve the requested dataset.</p>";
        }
    }
}
