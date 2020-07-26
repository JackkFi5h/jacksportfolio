---
template: BlogPost
path: /minecraft-clone
date: 2019-03-11T12:12:25.364Z
title: 'CubeWorld Clone'
thumbnail: /assets/cubeworldCloneThumbnail.jpg
pagephoto: /assets/cubeworldCloneThumbnail.jpg
metaDescription: 'test'
tags:
- C#
- Unity
---
# Monstars

I have always been fascinated with how games such as Minecraft and CubeWorld are able to generate 'realistic' voxel terrain and decided to spend a month researching how these games achieve these terrains.

During this research I learn't about 2d and 3d perlin noise and how they can be used and sequenced to generate different realistic structures. I first learn't how 2d perlin noise works and implemented a simple voxel mapping using the 0-1 float value generated from the coordinate of each cube in world space.

Disclaimer: I have since lost the source code for the project but I remember most of what I did, so take the code snippets with a grain of salt as they are more pseudocode than actual performant code. I still have screenshots which I will be showcasing as well as outlining the processes I did.
![](assets/perlin2d.png)

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

```csharp
//loop through each dimension in a 16^3 chunk
for(x=0; x < 16; x++)
{
  for(z=0; z < 16; z++)
  {
    for(y=0; y < 16; y++)
    {
      var newBlock = Instantiate(block.gameObject, x, z); //create block at position
      var height = 0;
      if(block.type == BlockType.Stone)
      {
          height = Get3DNoise < threshold //threshold value to limit the spawning of 3d noise cliffs 
      }
      else
      {
          height = Mathf.PerlinNoise(x, z); //create perlin mapped height
      }  
      newBlock.transform.position = new Vector3(x,height,z); //update position
    }
  }
}
... //open source 3d noise method
public static float Get3DNoise(float x, float y, float z, float sm, int oct)
    { 
        if(xOffset == 0f)
        {
            if(alpha_xOffset.Length == 0)
                alpha_xOffset = RandomString(Random.Range(3,10));
            xOffset = alpha_xOffset.GetHashCode() / 1000;
            while (Mathf.Abs(xOffset) > 250000)
            {
                xOffset = xOffset / 10;
            }
        }
        if (yOffset == 0f)
        {
            //yOffset = Random.Range(-100000f, 100000f);
            if (alpha_yOffset.Length == 0)
                alpha_yOffset = RandomString(Random.Range(3, 10));
            yOffset = alpha_yOffset.GetHashCode() / 1000;
            while(Mathf.Abs(yOffset) > 250000)
            {
                yOffset = yOffset / 10;
            }
        }
        if (zOffset == 0f)
        {
            //zOffset = Random.Range(-100000f, 100000f);
            if (alpha_zOffset.Length == 0)
                alpha_zOffset = RandomString(Random.Range(3, 10));
            zOffset = alpha_zOffset.GetHashCode() / 1000;
            while (Mathf.Abs(zOffset) > 250000)
            {
                zOffset = zOffset / 10;
            }
        }
        float XY = fBM((x+xOffset) * sm, (y+yOffset) * sm, oct, 0.5f);
        float YZ = fBM((y+yOffset) * sm, (z+zOffset) * sm, oct, 0.5f);
        float XZ = fBM((x+xOffset) * sm, (z+zOffset) * sm, oct, 0.5f);

        float YX = fBM((y+yOffset) * sm, (x+xOffset) * sm, oct, 0.5f);
        float ZY = fBM((z+zOffset) * sm, (y+yOffset) * sm, oct, 0.5f);
        float ZX = fBM((z+zOffset) * sm, (x+xOffset) * sm, oct, 0.5f);

        return (XY + YZ + XZ + YX + ZY + ZX) / 6.0f;
    }
```
This was the result of using 3d noise, as you can see "overhangs" are now being generated which opens a lot of possibilities for realistic terrain such as caves.
!["cliff"](assets/cwCliff.jpg)

Another thing I implemented was the ability to use vertex shading on the grass to give the terrain a different colour depending on three variables (temperature, humidity and altitude). Each would have an influence on each of the RGB values respectively, meaning cold high points would be blue and low hot places would be more desert colored.

Temperature: A perlin noise map, the values of 0 to 1 being mapped to a suitable temperature range (0-40 degrees Celsius).

Humidity: A perlin noise map (not too dissimilar to the temperature map) that had values between 0 and 100.

Altitude: The height above sea level (-50 to 150) measured in blocks.

These values were mapped by modifying the vertex colors on the meshes generated, by first generating a RGB value that corresponds to the values of these 3 variables at the point of the block in question.

```csharp
public Color GetColor(Vector3 blockPos)
{
	float[] variables = Utils.GetTerrainVariables(blockPos);
	var r = ScaleValues(0,40,0,60, variables[0]); //set red in its range
	var g = ScaleValues(0,100,200,255, variables[0]); //set green in its range
	var b = ScaleValues(-50,150,0,75, variables[0]); //set blue in its range
	return new Color(r,g,b);
}
```
---
!["vertex colors"](assets/cubeworldCloneThumbnail.jpg)
