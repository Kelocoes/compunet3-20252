function matrixSearch(matrix) {
    console.time("Execution Time");
    const n = matrix.length;
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const directions = [
        [-1, 0], // Up
        [0, 1],  // Right
        [1, 0],  // Down
        [0, -1]  // Left
    ];

    function isValid(x, y) {
        return x >= 0 && x < n && y >= 0 && y < n && !visited[x][y];
    }

    function dfs(x, y) {
        if (x === n - 1 && y === n - 1) {
            return true;
        }

        visited[x][y] = true;

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (isValid(newX, newY) && matrix[newX][newY] === 1) {
                if (dfs(newX, newY)) {
                    return true;
                }
            }
        }

        return false;
    }

    const result = dfs(0, 0);
    console.timeEnd("Execution Time");
    return result;
}

module.exports = { matrixSearch };