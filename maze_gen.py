import random

def generate_maze(width, height, num_stars):
    grid = [[1 for _ in range(width)] for _ in range(height)]
    
    # Simple randomized DFS maze generation
    stack = [(1, 1)]
    grid[1][1] = 0
    
    while stack:
        x, y = stack[-1]
        
        # Directions: up, down, left, right (steps of 2)
        dirs = [(0, -2), (0, 2), (-2, 0), (2, 0)]
        random.shuffle(dirs)
        
        carved = False
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if 1 <= nx < width-1 and 1 <= ny < height-1 and grid[ny][nx] == 1:
                grid[y + dy//2][x + dx//2] = 0
                grid[ny][nx] = 0
                stack.append((nx, ny))
                carved = True
                break
                
        if not carved:
            stack.pop()
            
    # Remove some walls to create loops (makes it easier and less linear)
    for _ in range((width * height) // 10):
        x, y = random.randint(1, width-2), random.randint(1, height-2)
        if grid[y][x] == 1:
            # Check if it connects two 0s
            neighbors = 0
            if grid[y-1][x] == 0: neighbors += 1
            if grid[y+1][x] == 0: neighbors += 1
            if grid[y][x-1] == 0: neighbors += 1
            if grid[y][x+1] == 0: neighbors += 1
            if neighbors >= 2:
                grid[y][x] = 0
                
    # Place exit
    exit_x, exit_y = width-2, height-2
    grid[exit_y][exit_x] = 3
    # Make sure exit is accessible
    grid[exit_y-1][exit_x] = 0
    grid[exit_y][exit_x-1] = 0
    
    # Place stars
    stars_placed = 0
    while stars_placed < num_stars:
        x, y = random.randint(1, width-2), random.randint(1, height-2)
        if grid[y][x] == 0 and (x, y) != (1, 1) and (x, y) != (exit_x, exit_y):
            grid[y][x] = 2
            stars_placed += 1
            
    # Print C# format
    print(f"Grid = new int[{height}, {width}]")
    print("{")
    for y in range(height):
        row_str = "    { " + ", ".join(str(cell) for cell in grid[y]) + " }"
        if y < height - 1:
            row_str += ","
        print(row_str)
    print("};")

print("--- Level 3 ---")
generate_maze(20, 20, 5)
print("\n--- Level 4 ---")
generate_maze(25, 25, 8)
