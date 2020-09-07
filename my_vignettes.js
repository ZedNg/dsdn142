//scene1 variables
var seq1frame_number = 0;
var instruction1screen = false;

var wake = {
  x: 900,
  y: 374,
  speed: 12,
  size: 50,
  colour: "#69ff00",
  image: "handhover-01"
};

var snooze = {
  x: 356,
  y: 432,
  size: 100,
  xspeed: Math.floor((Math.random() * 20) + 1),
  yspeed: Math.floor((Math.random() * 10) + 1),
  xdir: 1,
  ydir: 1,
  colour: "#0057ff",
  image: "phoneclock-02-01"
};

var ti = 0;
var sleeping = true;
var ti_limit = 8;

//scene2 variables

var ingredientsrow = {
  x: 100,
  y: 150,
  speed: 20
};

var position;
var pouring = false;
var cupState;
var cupCounter = 0;
var ingredientType = ["coffeepowder", "pitcher", "milk", "sugar"];
var ingredientActionType = ["coffeepowder", "pitcherpour", "milk-pour", "sugar"];
var pourType = ["powder", "water", "milkliquid", "scube"];

var ingredientCounter = 0;
var coffeeCounter = 0;
var waterCounter = 0;
var milkCounter = 0;
var sugarCounter = 0;


//scene3 variables
var letter = [];
var allowedLetters = [];
var pushed = [];
var word = {
  x: 600,
  y: 600,
  character: 0
}
var counter = 0;
var switchScore = 0;
var argh_once = true;
var yum_once = true;
var switch_once = true;
var allow_drop_sound = true;


var scene3bg;



//program setup and preloads
function setup_vignettes(vignettes) {
  vignettes.scale_to_screen(true);
  vignettes.load_image_sequence("seq1", "png", 154);
  vignettes.load_image("gamebg", "png");
  vignettes.load_image("wake", "png");
  vignettes.load_image("handhover-01", "png");
  vignettes.load_image("handpressed-01", "png");
  vignettes.load_image("phoneclock-02-01", "png");
  vignettes.load_image("coffeepowder", "png");
  vignettes.load_image("cup0", "png");
  vignettes.load_image("cup1", "png");
  vignettes.load_image("cup2", "png");
  vignettes.load_image("cup3", "png");
  vignettes.load_image("cup4", "png");
  vignettes.load_image("cup5", "png");
  vignettes.load_image("milk", "png");
  vignettes.load_image("milk-pour", "png");
  vignettes.load_image("milkliquid", "png");
  vignettes.load_image("pitcher", "png");
  vignettes.load_image("pitcherpour", "png");
  vignettes.load_image("powder", "png");
  vignettes.load_image("scube", "png");
  vignettes.load_image("seq2-bg", "png");
  vignettes.load_image("spil", "png");
  vignettes.load_image("sugar", "png");
  vignettes.load_image("water", "png");
  vignettes.load_image("argh", "png");
  vignettes.load_image("yum", "png");
  vignettes.load_image("scene3-bg", "png");
  vignettes.load_image("keyletter", "png");
  vignettes.load_image("letsgo", "png");
  vignettes.load_image("scene3-bg", "png");
  vignettes.load_image("scene3-bg-1light", "png");
  vignettes.load_image("scene3-bg-2light", "png");
  vignettes.load_image("scene3-bg-nolight", "png");
  vignettes.load_sound("argh", "wav");
  vignettes.load_sound("drop", "wav");
  vignettes.load_sound("switch", "wav");
  vignettes.load_sound("snoring", "wav");
  vignettes.load_sound("yum", "wav");
  vignettes.load_sound("doorclose", "wav");
  vignettes.load_image("credit", "png");
}

function setup_scenes() {


  var scene1 = new Scene(scene1_draw);
  scene1.click = scene1_click;
  scene1.key_pressed = scene1_keypress;

  var scene2 = new Scene(scene2_draw);
  scene2.click = scene2_click;
  scene2.key_pressed = scene2_keypress;
  scene2.key_released = scene_2_key_released
  var scene3 = new Scene(scene3_draw);
  scene3.click = scene3_click;
  scene3.key_pressed = scene3_keypress;
  scene3.key_released = scene_3_key_released
  for (var i = 65; i < 81; i++) {
    allowedLetters.push(i);
  }

  for (var i = 0; i < 10; i++) {
    letter[i] = get_random_letter();
    pushed[i] = false;
  }

  scene3bg = "scene3-bg";



}

// Scene1 functions

function scene1_draw() {
  if (vignettes._asset_loader._sounds["snoring"].isPlaying() == false) {
    vignettes.play_sound("snoring");
  }
  vignettes.draw_image("gamebg", width / 2, height / 2);
  if (instruction1screen == true) {
    interaction1();
  } else {
    instruction1();
  };



}

function keyPressed() {
  if (keyCode === 32) {
    instruction1screen = true;

  }
}

function instruction1() {
  if (vignettes._asset_loader._sounds["snoring"].isPlaying() == false) {
    vignettes.play_sound("snoring");
  }
  vignettes.draw_image_from_sequence("seq1", width / 2, height / 2, seq1frame_number)
  if (frameCount % 2 == 0) {
    seq1frame_number += 1;
  }

  if (seq1frame_number == 154) {
    seq1frame_number = 153;
  }



}

function interaction1() {

  if (sleeping == true) {
    if (frameCount % 60 == 0) {
      ti++;
    }
    snoozeAction();
    wakeAction();
    contact();
    timer(width / 2 + 5, height / 2 + 45);
  } else {
    wakeScene();
  }
}

function wakeAction() {

  push();
  translate(wake.x, wake.y);
  scale(1);
  vignettes.draw_image(wake.image, 0, 0);
  pop();
  // // Mouse Control
  //
  // wake.x = mouseX
  // wake.y = mouseY

  // Keyboard Control

  //Left-A
  if (wake.x > (wake.size / 2)) {

    if (keyIsDown(65)) {
      wake.x -= wake.speed;
    }
  }
  //Right-D
  if (wake.x < width - (wake.size / 2)) {
    if (keyIsDown(68)) {

      wake.x += wake.speed;
    }
  }
  //Up-W
  if (wake.y > (wake.size / 2)) {
    if (keyIsDown(87)) {
      wake.y -= wake.speed;
    }
  }
  //Down-S
  if (wake.y < height - (wake.size / 2)) {
    if (keyIsDown(83)) {
      wake.y += wake.speed;
    }
  }
}


function snoozeAction() {

  vignettes.draw_image(snooze.image, snooze.x, snooze.y);

  if (snooze.x > width - (snooze.size / 2) || snooze.x < (snooze.size / 2)) {
    snooze.xdir *= -1;
  };
  snooze.x += snooze.xspeed * snooze.xdir;

  if (snooze.y > height - (snooze.size / 2) || snooze.y < (snooze.size / 2)) {
    snooze.ydir *= -1;
  };
  snooze.y += snooze.yspeed * snooze.ydir;

};

function contact() {
  var d = dist(wake.x, wake.y, snooze.x, snooze.y);
  if (d < ((snooze.size / 2) + (wake.size / 2))) {
    wake.image = "handpressed-01";
    console.log("contact");
    nextLevel();
  } else {
    wake.image = "handhover-01";
  };
};

function nextLevel() {

  snooze.x = random((snooze.size / 2), width - (snooze.size / 2));
  snooze.y = random((snooze.size / 2), height - (snooze.size / 2));

  snooze.xspeed += 5;
  snooze.yspeed += 6;

  wake.speed = constrain(wake.speed - 1.6, 1, 12);

  ti = 0;


}

function timer(px, py) {
  textSize(75);
  fill(0);
  text(ti_limit - ti, px, py);

  if (ti == ti_limit || snooze.xspeed > 60) {
    sleeping = false;
  }
}

function wakeScene() {
  vignettes.draw_image("wake", width / 2, height / 2);
  vignettes.stop_sound("snoring");
  setTimeout(function() {vignettes.go_to_scene(2)}, 2000);
}


function scene1_click() {
  console.log("scene1 clicked!", mouseX, mouseY);
}

function scene1_keypress() {
  console.log("scene1 key pressed!");
}


// Scene2 functions


function scene2_draw() {
  vignettes.draw_image("seq2-bg", width / 2, height / 2);
  ingredients();


}


var alreadyHit = false;

function ingredients() {


  cupState = "cup" + cupCounter;



  vignettes.draw_image(ingredientType[ingredientCounter], ingredientsrow.x, ingredientsrow.y);



  vignettes.draw_image(cupState, width / 2, 525);


  if (ingredientsrow.x > width) {
    ingredientsrow.x = 0;
    position = 0;
    ingredientCounter++;
  };



  if (pouring == false) {
    ingredientsrow.x += ingredientsrow.speed;
  }

  pouring = false;




  if (keyIsDown(83)) {
    if (allow_drop_sound == true) {
      if (vignettes._asset_loader._sounds["drop"].isPlaying() == false) {
        vignettes.play_sound("drop");
      }
      allow_drop_sound = false;
    }
    position = ingredientsrow.x;
    pour();
    if (position <= 485 || position >= 795) {
      pourmissed();
    } else {
      if (!alreadyHit) {

        pourhit();
        alreadyHit = true;
      }
    }
  } else {
    alreadyHit = false;
    allow_drop_sound = true;
  }

  if (keyIsDown(65) && ingredientsrow.speed > 5) {
    ingredientsrow.speed -= 1;
    //console.log(ingredientsrow.speed)
  }

  if (keyIsDown(68)) {
    ingredientsrow.speed += 1;
    // console.log(ingredientsrow.speed)
  }

  if (ingredientCounter == 4) {
    ingredientCounter = 0;
  }

  if (cupCounter == 5) {
    endScene();
  }
}

function pour() {
  pouring = true;
  var positionY = 350
  vignettes.draw_image(pourType[ingredientCounter], position, positionY);

}

function pourhit() {
  if (cupCounter < 5) {
    cupCounter += 1;
  }
}

function pourmissed() {

  vignettes.draw_image("spil", position, 695);
}


function endScene() {
  if (coffeeCounter == 2 && waterCounter == 2 && milkCounter == 1 && sugarCounter == 0) {
    vignettes.draw_image("yum", 1010, 412);
    if (vignettes._asset_loader._sounds["yum"].isPlaying() == false) {
      if (yum_once == true) {
        yum_once = false;
        vignettes.play_sound("yum");
      }
    }
  } else {
    vignettes.draw_image("argh", 1010, 412);
    if (vignettes._asset_loader._sounds["argh"].isPlaying() == false) {
      if (argh_once == true) {
        argh_once = false;
        vignettes.play_sound("argh");
      }
    }
  }

  setTimeout(function() {vignettes.go_to_scene(3)}, 2000);
}

function scene2_click() {
  console.log("scene2 clicked!", mouseX, mouseY);
}

var not_already_pressed = true;

function scene2_keypress() {
  if (keyCode == 83) {

    if (not_already_pressed && ingredientsrow.x > 485 && ingredientsrow.x < 795) {

      console.log("scene2 key pressed!");
      console.log("INGREDIENT TYPE: " + ingredientCounter);

      not_already_pressed = false;

      if (ingredientCounter == 0) {
        coffeeCounter++;
        console.log(coffeeCounter);
      }
      if (ingredientCounter == 1) {
        waterCounter++;
        console.log(waterCounter);
      }
      if (ingredientCounter == 2) {
        milkCounter++;
        console.log(milkCounter);
      }
      if (ingredientCounter == 3) {
        sugarCounter++;
        console.log(sugarCounter);
      }
    }
  }
}

function scene_2_key_released() {
  ingredientsrow.speed = 20;
  not_already_pressed = true;
}

// Scene3 functions
var timeoutSet = false;
var finished = false;
var started = false;
var doorclosing = true

function scene3_draw() {

  if (!started) {
    started = true;
    change_letter();
  }

  vignettes.draw_image(scene3bg, width / 2, height / 2);

  if (switchScore < 10) {
    mole();
  }
  if (switchScore < 3) {
    scene3bg = "scene3-bg";
  }
  if (switchScore >= 3 && switchScore < 5) {
    scene3bg = "scene3-bg-2light";
  }
  if (switchScore >= 5 && switchScore < 10) {
    scene3bg = "scene3-bg-1light";
  }
  if (switchScore >= 10) {
    scene3bg = "scene3-bg-nolight";

    if (!timeoutSet) {
      timeoutSet = true;
      setTimeout(function() {finished = true;}, 750)

    }

    if (finished) {
      vignettes.draw_image("letsgo", width / 2, height / 2);
      vignettes.draw_image("credit", width / 2, height / 2);
      if (doorclosing) {
        if (vignettes._asset_loader._sounds["doorclose"].isPlaying() == false) {
          vignettes.play_sound("doorclose");
          doorclosing = false;
        }

      }
    }
  }
}

function get_random_letter() {
  var indx = Math.round(random(0, allowedLetters.length - 1));
  return allowedLetters.splice(indx, 1)[0];
}

function mole() {

  word.character = letter[counter]
  if (counter < 10) {
    textSize(32);
    vignettes.draw_image("keyletter", word.x, word.y);
    text(char(word.character), word.x - 10, word.y + 10);
  }

}

function scene3_click() {
  console.log("scene3 clicked!", mouseX, mouseY);
}

var changeTimeout;

function scene3_keypress() {
  console.log("scene3 key pressed!");

  if (keyCode === letter[counter]) {

    if (vignettes._asset_loader._sounds["switch"].isPlaying() == false) {
      if (switch_once) {
        vignettes.play_sound("switch");
        switch_once = false;
      }
    }
    console.log("hit")
    switchScore++;
    clearTimeout(changeTimeout);
    change_letter(true);
  }
}

function scene_3_key_released() {
  switch_once = true;
}

function change_letter(wasHit) {

  if (wasHit) {
    letter.splice(counter, 1);
  }

  counter = floor(random(letter.length));
  word.x = random(300, width - 200);
  word.y = random(200, height - 200);

  changeTimeout = setTimeout(change_letter, 1000);
}
