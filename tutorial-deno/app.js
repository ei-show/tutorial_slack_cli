import { open } from "https://deno.land/x/opener@v1.0.1/mod.ts";


const cat_or_dog = Deno.args[0];
let url = "";

switch (cat_or_dog) {
  case 'cat':
    console.log(`Meow, you're a kitty!`);

    const cat_response = await fetch('https://api.thecatapi.com/v1/images/search');
    const cat_json = await cat_response.json();
    url = cat_json[0].url;

    break;
  case 'dog':
    console.log(`Who's a good dog?`);

    const dog_response = await fetch('https://dog.ceo/api/breeds/image/random');
    const dog_json = await dog_response.json();
    url = dog_json.message;

    break;
}

console.log(url);

await open(url);
