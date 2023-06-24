import pygame
import random
import math

# Pygame initialization
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))

# Game entities
class Missile:
    def __init__(self, start, target, speed, color):
        self.start = start
        self.target = target
        self.speed = speed
        self.color = color
        self.pos = start
        self.done = False

    def update(self):
        dx = self.target[0] - self.start[0]
        dy = self.target[1] - self.start[1]
        angle = math.atan2(dy, dx)
        vx = self.speed * math.cos(angle)
        vy = self.speed * math.sin(angle)
        self.pos = (self.pos[0] + vx, self.pos[1] + vy)
        if self.distance(self.pos, self.target) < 10:
            self.done = True

    def distance(self, pos1, pos2):
        return ((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2)**0.5

    def draw(self):
        pygame.draw.line(screen, self.color, self.start, self.pos)

# Player and enemy missiles
player_missiles = []
enemy_missiles = []

# Game loop
running = True
while running:
    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            player_missiles.append(Missile((WIDTH // 2, HEIGHT), pygame.mouse.get_pos(), 5, (0, 255, 0)))

    # Enemy spawns a missile
    if random.random() < 0.01:
        enemy_missiles.append(Missile((random.randint(0, WIDTH), 0), (random.randint(0, WIDTH), HEIGHT), 2, (255, 0, 0)))

    # Clear screen
    screen.fill((0, 0, 0))

    # Update and draw player missiles
    for missile in player_missiles:
        missile.update()
        missile.draw()

    # Update and draw enemy missiles
    for missile in enemy_missiles:
        missile.update()
        missile.draw()

    # Collision detection
    for p_missile in player_missiles:
        for e_missile in enemy_missiles:
            if p_missile.distance(p_missile.pos, e_missile.pos) < 10:
                player_missiles.remove(p_missile)
                enemy_missiles.remove(e_missile)

    # Remove done missiles
    player_missiles = [missile for missile in player_missiles if not missile.done]
    enemy_missiles = [missile for missile in enemy_missiles if not missile.done]

    # Flip buffers
    pygame.display.flip()

# Cleanup
pygame.quit()
