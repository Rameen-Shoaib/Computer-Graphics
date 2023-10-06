from vpython import *
import math

# radius
R = 1
# angle increment
# 2*math.pi/anyAngle to change the shape like pentagon, square
deltheta = 2*math.pi/5
theta = 0
circle_list = []
while (theta <= 2*math.pi):
    circle_list.append(vector(R*cos(theta), R*sin(theta), 0))
    theta = theta + deltheta
# print(circle_list)
circle = curve(pos=circle_list, color=color.magenta)