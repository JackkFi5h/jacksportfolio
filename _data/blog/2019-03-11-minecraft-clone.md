---
template: BlogPost
path: /minecraft-clone
date: 2019-03-11T12:12:25.364Z
title: 'CubeWorld Clone'
thumbnail: /assets/cubeworldCloneThumbnail.jpg
metaDescription: 'test'
tags:
- C#
- Unity
---
# Monstars

I have always been fascinated with how games such as Minecraft and CubeWorld are able to generate 'realistic' voxel terrain and decided to spend a month researching how these games achieve these terrains.

During this research I learn't about 2d and 3d perlin noise and how they can be used and sequenced to generate different realistic structures. I first learn't how 2d perlin noise works and implemented a simple voxel mapping using the 0-1 float value generated from the coordinate of each cube in world space.
pseudocode
![](/static/assets/perlin2d.png)

```csharp
//loop through each dimension in a 16^3 chunk
for(x=0; x < 16; x++)
{
  for(z=0; z < 16; z++)
  {
    for(y=0; y < 16; y++)
    {
      var block = Instantiate(block, x, z); //create block at position        
      var height = Mathf.PerlinNoise(x, z); //create perlin mapped height
      block.transform.position.y = height; //assign height
    }
  }
}

```
 However this lead to some boring terrain as with 2d perlin noise you are limited to a 'rolling-hills' style terrain where any voxel in the world space can only be manipulated by noise values on the y (up) axis. This isn't what is seen in Minecraft and more specifically cube world, where caves and overhangs can be found everywhere. This led me onto using 3d perlin noise to layer another 2d perlin noise as a 'density' value, if this value was above a threshold at that cubes worldspace co-ordinate.


