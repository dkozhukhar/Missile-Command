import random

class Game:
    def __init__(self, grid_size=5, enemy_count=3, missile_count=10):
        self.grid_size = grid_size
        self.enemy_count = enemy_count
        self.missile_count = missile_count
        self.score = 0
        self.grid = [['O' for _ in range(grid_size)] for _ in range(grid_size)]
        self.enemy_locations = []

        # Place enemies on the grid
        while len(self.enemy_locations) < self.enemy_count:
            x, y = random.randint(0, grid_size-1), random.randint(0, grid_size-1)
            if (x, y) not in self.enemy_locations:
                self.enemy_locations.append((x, y))

    def launch_missile(self, x, y):
        if self.missile_count == 0:
            return False
        self.missile_count -= 1

        # Check if missile hits an enemy
        if (x, y) in self.enemy_locations:
            self.enemy_locations.remove((x, y))
            self.score += 1
            self.grid[x][y] = 'X'
            return True
        else:
            self.grid[x][y] = '*'
            return False

    def display_grid(self):
        for row in self.grid:
            print(' '.join(row))
        print(f"Score: {self.score}, Missiles left: {self.missile_count}")

game = Game()

while game.missile_count > 0 and game.score < game.enemy_count:
    game.display_grid()
    x = int(input("Enter x-coordinate: "))
    y = int(input("Enter y-coordinate: "))
    hit = game.launch_missile(x, y)
    if hit:
        print("You hit an enemy!")
    else:
        print("Missed!")

if game.score == game.enemy_count:
    print("Congratulations! You've destroyed all enemy locations.")
else:
    print("Game over. You've run out of missiles.")
