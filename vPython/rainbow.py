from vpython import *
import math 

R = 2.2
i = 0
c = [color.red, color.orange, color.yellow, color.green, color.blue, color.cyan, color.purple]
for x in range(7):
    deltheta = math.pi/35
    theta = 0
    circle_list = []
    while (theta <= math.pi):
        circle_list.append(vector(R*cos(theta), R*sin(theta), 0))
        theta = theta + deltheta
    circle1 = curve(pos=circle_list, color=c[i], radius=0.1)
    R = R - 0.2
    i += 1