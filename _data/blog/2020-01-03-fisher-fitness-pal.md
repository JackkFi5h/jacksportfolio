---
template: BlogPost
path: /fisher-fitness-pal
date: 2020-03-23T12:12:25.364Z
title: 'FisherFitnessPal'
thumbnail: /assets/fisherFitnessPalThumbnail.png
pagephoto: /assets/fisherFitnessPalThumbnail.png
metaDescription: 'test'
tags:
- Android
- C#
- Xamarin
---
# FisherFitnessPal

FisherFitnessPal is my very own fitness app, originally developed for my college coursework it is my first fully fledged mobile application that encompasses a variety of fitness and dietary tracking functionalities It was built in around 3 months using Xamarin Forms and has been extensively documented as required for my coursework.



##Link

[https://drive.google.com/file/d/1iVMKtxMRiI9cwQALvAcNH1z4ncEgsVTA/view?usp=sharing](https://drive.google.com/file/d/1iVMKtxMRiI9cwQALvAcNH1z4ncEgsVTA/view?usp=sharing)

As explainined in the documentation, FisherFitnessPal is an all-round fitness tracker, capable of tracking food, weight and strength-focused workouts over time to ensure progress is made and the user is able to meet their fitness goals. 

I achieved this by splitting the development of FFP into those three different functionalities, implementing them fully before moving onto the next.

##Calorie Tracking
![diary](/assets/ffp_food_diary.png)![calorie tracking](/assets/ffp_calorie_tracking.png)

In order to meet any sort of fitness goal, whether it be lose weight or gain muscle, one of the most important factors is diet and more specifically the macronutrients that make up that diet, and the total calories that they make up.

FisherFitnessPal aimed to beat existing solutions such as MyFitnessPal by providing vast macro and micronutrient data for foods, which is powered using the Edamam food and nutrient database API. This required extensive implementation to allow users to track foods efficiently, allowing users to search for food items by directly querying this api as well as scanning the barcodes of the foods they consume. Edamam is also powerful in that each food added likely has a unique quantity identifier that allows portions to be easily assigned without guessing the weight they've consumed. An example of this would be a pizza having a "quantity" for a slice of pizza.

##Weight Tracking
![weight tracking](/assets/ffp_weight_tracking.png) ![monthly](/assets/ffp_weight_tracking_monthly.png)


FisherFitnessPal is also capable of tracking your weight over time, comparing it to your defined 'fitness goal' (i.e. lose 1kg a week) and tracks your progress compared to that goal and suggests a caloric manipulation from your trend in order to better meet that goal.

##Workout/Strength Tracking
![workout tracking](/assets/ffp_strength_tracking.png)

FisherFitnessPal also supports workout tracking. Users are able to define new exercises or choose from a database of exercises, they can specify the amount of sets/weight/reps for each exercise which will calculate an 'Arbitrary strength value' that can also be tracked over time which would be useful for strength athletes aiming to achieve progressive overload.

![exercise](/assets/ffp_exercise_tracking.png)
#Learning

During the production of FisherFitnessPal I learnt a lot about mobile development, how to efficiently debug mobile applications, how to persist data locally and integrate APIs to my applications. This venture also improved my knowledge of C# by taking advantage of the languages asynchronous capabilities on certain functions such as API calls to make the application feel smoother.


