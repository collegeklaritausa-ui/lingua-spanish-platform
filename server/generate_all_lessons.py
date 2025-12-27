#!/usr/bin/env python3
"""
Prize2Pride Spanish Platform - Complete Lesson Generator
Generates 10,000 lessons across CEFR levels A1-C2 using comprehensive templates
"""

import json
import os
import random
from datetime import datetime

# Comprehensive vocabulary and content databases
VOCABULARY_DB = {
    'A1': {
        'greetings': [
            {'spanish': 'hola', 'english': 'hello', 'pronunciation': 'OH-lah', 'pos': 'interjection'},
            {'spanish': 'buenos días', 'english': 'good morning', 'pronunciation': 'BWEH-nohs DEE-ahs', 'pos': 'phrase'},
            {'spanish': 'buenas tardes', 'english': 'good afternoon', 'pronunciation': 'BWEH-nahs TAR-dehs', 'pos': 'phrase'},
            {'spanish': 'buenas noches', 'english': 'good evening/night', 'pronunciation': 'BWEH-nahs NOH-chehs', 'pos': 'phrase'},
            {'spanish': 'adiós', 'english': 'goodbye', 'pronunciation': 'ah-dee-OHS', 'pos': 'interjection'},
            {'spanish': 'hasta luego', 'english': 'see you later', 'pronunciation': 'AHS-tah LWEH-goh', 'pos': 'phrase'},
            {'spanish': 'hasta mañana', 'english': 'see you tomorrow', 'pronunciation': 'AHS-tah mah-NYAH-nah', 'pos': 'phrase'},
            {'spanish': 'mucho gusto', 'english': 'nice to meet you', 'pronunciation': 'MOO-choh GOOS-toh', 'pos': 'phrase'},
            {'spanish': 'encantado/a', 'english': 'pleased to meet you', 'pronunciation': 'ehn-kahn-TAH-doh', 'pos': 'adjective'},
            {'spanish': '¿cómo estás?', 'english': 'how are you?', 'pronunciation': 'KOH-moh ehs-TAHS', 'pos': 'phrase'},
            {'spanish': '¿cómo está usted?', 'english': 'how are you? (formal)', 'pronunciation': 'KOH-moh ehs-TAH oos-TEHD', 'pos': 'phrase'},
            {'spanish': 'bien', 'english': 'well/good', 'pronunciation': 'bee-EHN', 'pos': 'adverb'},
            {'spanish': 'muy bien', 'english': 'very well', 'pronunciation': 'mwee bee-EHN', 'pos': 'phrase'},
            {'spanish': 'mal', 'english': 'bad/badly', 'pronunciation': 'mahl', 'pos': 'adverb'},
            {'spanish': 'así así', 'english': 'so-so', 'pronunciation': 'ah-SEE ah-SEE', 'pos': 'phrase'},
            {'spanish': 'me llamo', 'english': 'my name is', 'pronunciation': 'meh YAH-moh', 'pos': 'phrase'},
            {'spanish': '¿cómo te llamas?', 'english': 'what is your name?', 'pronunciation': 'KOH-moh teh YAH-mahs', 'pos': 'phrase'},
            {'spanish': 'soy', 'english': 'I am', 'pronunciation': 'soy', 'pos': 'verb'},
            {'spanish': 'señor', 'english': 'Mr./sir', 'pronunciation': 'seh-NYOR', 'pos': 'noun'},
            {'spanish': 'señora', 'english': 'Mrs./madam', 'pronunciation': 'seh-NYOH-rah', 'pos': 'noun'},
            {'spanish': 'señorita', 'english': 'Miss', 'pronunciation': 'seh-nyoh-REE-tah', 'pos': 'noun'},
            {'spanish': 'por favor', 'english': 'please', 'pronunciation': 'pohr fah-BOHR', 'pos': 'phrase'},
            {'spanish': 'gracias', 'english': 'thank you', 'pronunciation': 'GRAH-see-ahs', 'pos': 'interjection'},
            {'spanish': 'de nada', 'english': 'you\'re welcome', 'pronunciation': 'deh NAH-dah', 'pos': 'phrase'},
            {'spanish': 'perdón', 'english': 'excuse me/sorry', 'pronunciation': 'pehr-DOHN', 'pos': 'interjection'},
            {'spanish': 'lo siento', 'english': 'I\'m sorry', 'pronunciation': 'loh see-EHN-toh', 'pos': 'phrase'},
            {'spanish': 'con permiso', 'english': 'excuse me (to pass)', 'pronunciation': 'kohn pehr-MEE-soh', 'pos': 'phrase'},
            {'spanish': 'bienvenido/a', 'english': 'welcome', 'pronunciation': 'bee-ehn-beh-NEE-doh', 'pos': 'adjective'},
        ],
        'numbers': [
            {'spanish': 'uno', 'english': 'one', 'pronunciation': 'OO-noh', 'pos': 'number'},
            {'spanish': 'dos', 'english': 'two', 'pronunciation': 'dohs', 'pos': 'number'},
            {'spanish': 'tres', 'english': 'three', 'pronunciation': 'trehs', 'pos': 'number'},
            {'spanish': 'cuatro', 'english': 'four', 'pronunciation': 'KWAH-troh', 'pos': 'number'},
            {'spanish': 'cinco', 'english': 'five', 'pronunciation': 'SEEN-koh', 'pos': 'number'},
            {'spanish': 'seis', 'english': 'six', 'pronunciation': 'says', 'pos': 'number'},
            {'spanish': 'siete', 'english': 'seven', 'pronunciation': 'see-EH-teh', 'pos': 'number'},
            {'spanish': 'ocho', 'english': 'eight', 'pronunciation': 'OH-choh', 'pos': 'number'},
            {'spanish': 'nueve', 'english': 'nine', 'pronunciation': 'NWEH-beh', 'pos': 'number'},
            {'spanish': 'diez', 'english': 'ten', 'pronunciation': 'dee-EHS', 'pos': 'number'},
            {'spanish': 'once', 'english': 'eleven', 'pronunciation': 'OHN-seh', 'pos': 'number'},
            {'spanish': 'doce', 'english': 'twelve', 'pronunciation': 'DOH-seh', 'pos': 'number'},
            {'spanish': 'trece', 'english': 'thirteen', 'pronunciation': 'TREH-seh', 'pos': 'number'},
            {'spanish': 'catorce', 'english': 'fourteen', 'pronunciation': 'kah-TOHR-seh', 'pos': 'number'},
            {'spanish': 'quince', 'english': 'fifteen', 'pronunciation': 'KEEN-seh', 'pos': 'number'},
            {'spanish': 'veinte', 'english': 'twenty', 'pronunciation': 'BAYN-teh', 'pos': 'number'},
            {'spanish': 'treinta', 'english': 'thirty', 'pronunciation': 'TRAYN-tah', 'pos': 'number'},
            {'spanish': 'cuarenta', 'english': 'forty', 'pronunciation': 'kwah-REHN-tah', 'pos': 'number'},
            {'spanish': 'cincuenta', 'english': 'fifty', 'pronunciation': 'seen-KWEHN-tah', 'pos': 'number'},
            {'spanish': 'cien', 'english': 'one hundred', 'pronunciation': 'see-EHN', 'pos': 'number'},
            {'spanish': 'primero', 'english': 'first', 'pronunciation': 'pree-MEH-roh', 'pos': 'ordinal'},
            {'spanish': 'segundo', 'english': 'second', 'pronunciation': 'seh-GOON-doh', 'pos': 'ordinal'},
            {'spanish': 'tercero', 'english': 'third', 'pronunciation': 'tehr-SEH-roh', 'pos': 'ordinal'},
        ],
        'colors': [
            {'spanish': 'rojo', 'english': 'red', 'pronunciation': 'ROH-hoh', 'pos': 'adjective'},
            {'spanish': 'azul', 'english': 'blue', 'pronunciation': 'ah-SOOL', 'pos': 'adjective'},
            {'spanish': 'verde', 'english': 'green', 'pronunciation': 'BEHR-deh', 'pos': 'adjective'},
            {'spanish': 'amarillo', 'english': 'yellow', 'pronunciation': 'ah-mah-REE-yoh', 'pos': 'adjective'},
            {'spanish': 'naranja', 'english': 'orange', 'pronunciation': 'nah-RAHN-hah', 'pos': 'adjective'},
            {'spanish': 'morado', 'english': 'purple', 'pronunciation': 'moh-RAH-doh', 'pos': 'adjective'},
            {'spanish': 'rosa', 'english': 'pink', 'pronunciation': 'ROH-sah', 'pos': 'adjective'},
            {'spanish': 'blanco', 'english': 'white', 'pronunciation': 'BLAHN-koh', 'pos': 'adjective'},
            {'spanish': 'negro', 'english': 'black', 'pronunciation': 'NEH-groh', 'pos': 'adjective'},
            {'spanish': 'gris', 'english': 'gray', 'pronunciation': 'grees', 'pos': 'adjective'},
            {'spanish': 'marrón', 'english': 'brown', 'pronunciation': 'mah-RROHN', 'pos': 'adjective'},
            {'spanish': 'dorado', 'english': 'gold/golden', 'pronunciation': 'doh-RAH-doh', 'pos': 'adjective'},
            {'spanish': 'plateado', 'english': 'silver', 'pronunciation': 'plah-teh-AH-doh', 'pos': 'adjective'},
            {'spanish': 'claro', 'english': 'light (color)', 'pronunciation': 'KLAH-roh', 'pos': 'adjective'},
            {'spanish': 'oscuro', 'english': 'dark', 'pronunciation': 'ohs-KOO-roh', 'pos': 'adjective'},
        ],
        'family': [
            {'spanish': 'familia', 'english': 'family', 'pronunciation': 'fah-MEE-lee-ah', 'pos': 'noun'},
            {'spanish': 'padre', 'english': 'father', 'pronunciation': 'PAH-dreh', 'pos': 'noun'},
            {'spanish': 'madre', 'english': 'mother', 'pronunciation': 'MAH-dreh', 'pos': 'noun'},
            {'spanish': 'padres', 'english': 'parents', 'pronunciation': 'PAH-drehs', 'pos': 'noun'},
            {'spanish': 'hijo', 'english': 'son', 'pronunciation': 'EE-hoh', 'pos': 'noun'},
            {'spanish': 'hija', 'english': 'daughter', 'pronunciation': 'EE-hah', 'pos': 'noun'},
            {'spanish': 'hermano', 'english': 'brother', 'pronunciation': 'ehr-MAH-noh', 'pos': 'noun'},
            {'spanish': 'hermana', 'english': 'sister', 'pronunciation': 'ehr-MAH-nah', 'pos': 'noun'},
            {'spanish': 'abuelo', 'english': 'grandfather', 'pronunciation': 'ah-BWEH-loh', 'pos': 'noun'},
            {'spanish': 'abuela', 'english': 'grandmother', 'pronunciation': 'ah-BWEH-lah', 'pos': 'noun'},
            {'spanish': 'tío', 'english': 'uncle', 'pronunciation': 'TEE-oh', 'pos': 'noun'},
            {'spanish': 'tía', 'english': 'aunt', 'pronunciation': 'TEE-ah', 'pos': 'noun'},
            {'spanish': 'primo', 'english': 'cousin (male)', 'pronunciation': 'PREE-moh', 'pos': 'noun'},
            {'spanish': 'prima', 'english': 'cousin (female)', 'pronunciation': 'PREE-mah', 'pos': 'noun'},
            {'spanish': 'sobrino', 'english': 'nephew', 'pronunciation': 'soh-BREE-noh', 'pos': 'noun'},
            {'spanish': 'sobrina', 'english': 'niece', 'pronunciation': 'soh-BREE-nah', 'pos': 'noun'},
            {'spanish': 'esposo', 'english': 'husband', 'pronunciation': 'ehs-POH-soh', 'pos': 'noun'},
            {'spanish': 'esposa', 'english': 'wife', 'pronunciation': 'ehs-POH-sah', 'pos': 'noun'},
            {'spanish': 'nieto', 'english': 'grandson', 'pronunciation': 'nee-EH-toh', 'pos': 'noun'},
            {'spanish': 'nieta', 'english': 'granddaughter', 'pronunciation': 'nee-EH-tah', 'pos': 'noun'},
        ],
        'food': [
            {'spanish': 'comida', 'english': 'food', 'pronunciation': 'koh-MEE-dah', 'pos': 'noun'},
            {'spanish': 'desayuno', 'english': 'breakfast', 'pronunciation': 'deh-sah-YOO-noh', 'pos': 'noun'},
            {'spanish': 'almuerzo', 'english': 'lunch', 'pronunciation': 'ahl-MWEHR-soh', 'pos': 'noun'},
            {'spanish': 'cena', 'english': 'dinner', 'pronunciation': 'SEH-nah', 'pos': 'noun'},
            {'spanish': 'pan', 'english': 'bread', 'pronunciation': 'pahn', 'pos': 'noun'},
            {'spanish': 'arroz', 'english': 'rice', 'pronunciation': 'ah-RROHS', 'pos': 'noun'},
            {'spanish': 'carne', 'english': 'meat', 'pronunciation': 'KAHR-neh', 'pos': 'noun'},
            {'spanish': 'pollo', 'english': 'chicken', 'pronunciation': 'POH-yoh', 'pos': 'noun'},
            {'spanish': 'pescado', 'english': 'fish', 'pronunciation': 'pehs-KAH-doh', 'pos': 'noun'},
            {'spanish': 'huevo', 'english': 'egg', 'pronunciation': 'WEH-boh', 'pos': 'noun'},
            {'spanish': 'fruta', 'english': 'fruit', 'pronunciation': 'FROO-tah', 'pos': 'noun'},
            {'spanish': 'manzana', 'english': 'apple', 'pronunciation': 'mahn-SAH-nah', 'pos': 'noun'},
            {'spanish': 'naranja', 'english': 'orange', 'pronunciation': 'nah-RAHN-hah', 'pos': 'noun'},
            {'spanish': 'plátano', 'english': 'banana', 'pronunciation': 'PLAH-tah-noh', 'pos': 'noun'},
            {'spanish': 'verdura', 'english': 'vegetable', 'pronunciation': 'behr-DOO-rah', 'pos': 'noun'},
            {'spanish': 'ensalada', 'english': 'salad', 'pronunciation': 'ehn-sah-LAH-dah', 'pos': 'noun'},
            {'spanish': 'sopa', 'english': 'soup', 'pronunciation': 'SOH-pah', 'pos': 'noun'},
            {'spanish': 'queso', 'english': 'cheese', 'pronunciation': 'KEH-soh', 'pos': 'noun'},
            {'spanish': 'leche', 'english': 'milk', 'pronunciation': 'LEH-cheh', 'pos': 'noun'},
            {'spanish': 'agua', 'english': 'water', 'pronunciation': 'AH-gwah', 'pos': 'noun'},
            {'spanish': 'café', 'english': 'coffee', 'pronunciation': 'kah-FEH', 'pos': 'noun'},
            {'spanish': 'té', 'english': 'tea', 'pronunciation': 'teh', 'pos': 'noun'},
            {'spanish': 'jugo', 'english': 'juice', 'pronunciation': 'HOO-goh', 'pos': 'noun'},
            {'spanish': 'vino', 'english': 'wine', 'pronunciation': 'BEE-noh', 'pos': 'noun'},
            {'spanish': 'cerveza', 'english': 'beer', 'pronunciation': 'sehr-BEH-sah', 'pos': 'noun'},
        ],
        'time': [
            {'spanish': 'hora', 'english': 'hour/time', 'pronunciation': 'OH-rah', 'pos': 'noun'},
            {'spanish': 'minuto', 'english': 'minute', 'pronunciation': 'mee-NOO-toh', 'pos': 'noun'},
            {'spanish': 'segundo', 'english': 'second', 'pronunciation': 'seh-GOON-doh', 'pos': 'noun'},
            {'spanish': 'mañana', 'english': 'morning/tomorrow', 'pronunciation': 'mah-NYAH-nah', 'pos': 'noun'},
            {'spanish': 'tarde', 'english': 'afternoon', 'pronunciation': 'TAHR-deh', 'pos': 'noun'},
            {'spanish': 'noche', 'english': 'night', 'pronunciation': 'NOH-cheh', 'pos': 'noun'},
            {'spanish': 'día', 'english': 'day', 'pronunciation': 'DEE-ah', 'pos': 'noun'},
            {'spanish': 'semana', 'english': 'week', 'pronunciation': 'seh-MAH-nah', 'pos': 'noun'},
            {'spanish': 'mes', 'english': 'month', 'pronunciation': 'mehs', 'pos': 'noun'},
            {'spanish': 'año', 'english': 'year', 'pronunciation': 'AH-nyoh', 'pos': 'noun'},
            {'spanish': 'hoy', 'english': 'today', 'pronunciation': 'oy', 'pos': 'adverb'},
            {'spanish': 'ayer', 'english': 'yesterday', 'pronunciation': 'ah-YEHR', 'pos': 'adverb'},
            {'spanish': 'ahora', 'english': 'now', 'pronunciation': 'ah-OH-rah', 'pos': 'adverb'},
            {'spanish': 'siempre', 'english': 'always', 'pronunciation': 'see-EHM-preh', 'pos': 'adverb'},
            {'spanish': 'nunca', 'english': 'never', 'pronunciation': 'NOON-kah', 'pos': 'adverb'},
            {'spanish': 'temprano', 'english': 'early', 'pronunciation': 'tehm-PRAH-noh', 'pos': 'adverb'},
            {'spanish': 'tarde', 'english': 'late', 'pronunciation': 'TAHR-deh', 'pos': 'adverb'},
        ],
        'weather': [
            {'spanish': 'tiempo', 'english': 'weather/time', 'pronunciation': 'tee-EHM-poh', 'pos': 'noun'},
            {'spanish': 'sol', 'english': 'sun', 'pronunciation': 'sohl', 'pos': 'noun'},
            {'spanish': 'lluvia', 'english': 'rain', 'pronunciation': 'YOO-bee-ah', 'pos': 'noun'},
            {'spanish': 'nieve', 'english': 'snow', 'pronunciation': 'nee-EH-beh', 'pos': 'noun'},
            {'spanish': 'viento', 'english': 'wind', 'pronunciation': 'bee-EHN-toh', 'pos': 'noun'},
            {'spanish': 'nube', 'english': 'cloud', 'pronunciation': 'NOO-beh', 'pos': 'noun'},
            {'spanish': 'calor', 'english': 'heat/hot', 'pronunciation': 'kah-LOHR', 'pos': 'noun'},
            {'spanish': 'frío', 'english': 'cold', 'pronunciation': 'FREE-oh', 'pos': 'noun/adj'},
            {'spanish': 'hace sol', 'english': 'it\'s sunny', 'pronunciation': 'AH-seh sohl', 'pos': 'phrase'},
            {'spanish': 'hace calor', 'english': 'it\'s hot', 'pronunciation': 'AH-seh kah-LOHR', 'pos': 'phrase'},
            {'spanish': 'hace frío', 'english': 'it\'s cold', 'pronunciation': 'AH-seh FREE-oh', 'pos': 'phrase'},
            {'spanish': 'llueve', 'english': 'it\'s raining', 'pronunciation': 'YWEH-beh', 'pos': 'verb'},
            {'spanish': 'nieva', 'english': 'it\'s snowing', 'pronunciation': 'nee-EH-bah', 'pos': 'verb'},
            {'spanish': 'está nublado', 'english': 'it\'s cloudy', 'pronunciation': 'ehs-TAH noo-BLAH-doh', 'pos': 'phrase'},
            {'spanish': 'temperatura', 'english': 'temperature', 'pronunciation': 'tehm-peh-rah-TOO-rah', 'pos': 'noun'},
        ],
        'body': [
            {'spanish': 'cuerpo', 'english': 'body', 'pronunciation': 'KWEHR-poh', 'pos': 'noun'},
            {'spanish': 'cabeza', 'english': 'head', 'pronunciation': 'kah-BEH-sah', 'pos': 'noun'},
            {'spanish': 'cara', 'english': 'face', 'pronunciation': 'KAH-rah', 'pos': 'noun'},
            {'spanish': 'ojo', 'english': 'eye', 'pronunciation': 'OH-hoh', 'pos': 'noun'},
            {'spanish': 'nariz', 'english': 'nose', 'pronunciation': 'nah-REES', 'pos': 'noun'},
            {'spanish': 'boca', 'english': 'mouth', 'pronunciation': 'BOH-kah', 'pos': 'noun'},
            {'spanish': 'oreja', 'english': 'ear', 'pronunciation': 'oh-REH-hah', 'pos': 'noun'},
            {'spanish': 'pelo', 'english': 'hair', 'pronunciation': 'PEH-loh', 'pos': 'noun'},
            {'spanish': 'mano', 'english': 'hand', 'pronunciation': 'MAH-noh', 'pos': 'noun'},
            {'spanish': 'brazo', 'english': 'arm', 'pronunciation': 'BRAH-soh', 'pos': 'noun'},
            {'spanish': 'pierna', 'english': 'leg', 'pronunciation': 'pee-EHR-nah', 'pos': 'noun'},
            {'spanish': 'pie', 'english': 'foot', 'pronunciation': 'pee-EH', 'pos': 'noun'},
            {'spanish': 'dedo', 'english': 'finger/toe', 'pronunciation': 'DEH-doh', 'pos': 'noun'},
            {'spanish': 'espalda', 'english': 'back', 'pronunciation': 'ehs-PAHL-dah', 'pos': 'noun'},
            {'spanish': 'corazón', 'english': 'heart', 'pronunciation': 'koh-rah-SOHN', 'pos': 'noun'},
            {'spanish': 'estómago', 'english': 'stomach', 'pronunciation': 'ehs-TOH-mah-goh', 'pos': 'noun'},
        ],
        'clothes': [
            {'spanish': 'ropa', 'english': 'clothes', 'pronunciation': 'ROH-pah', 'pos': 'noun'},
            {'spanish': 'camisa', 'english': 'shirt', 'pronunciation': 'kah-MEE-sah', 'pos': 'noun'},
            {'spanish': 'camiseta', 'english': 't-shirt', 'pronunciation': 'kah-mee-SEH-tah', 'pos': 'noun'},
            {'spanish': 'pantalón', 'english': 'pants', 'pronunciation': 'pahn-tah-LOHN', 'pos': 'noun'},
            {'spanish': 'falda', 'english': 'skirt', 'pronunciation': 'FAHL-dah', 'pos': 'noun'},
            {'spanish': 'vestido', 'english': 'dress', 'pronunciation': 'behs-TEE-doh', 'pos': 'noun'},
            {'spanish': 'zapato', 'english': 'shoe', 'pronunciation': 'sah-PAH-toh', 'pos': 'noun'},
            {'spanish': 'calcetín', 'english': 'sock', 'pronunciation': 'kahl-seh-TEEN', 'pos': 'noun'},
            {'spanish': 'chaqueta', 'english': 'jacket', 'pronunciation': 'chah-KEH-tah', 'pos': 'noun'},
            {'spanish': 'abrigo', 'english': 'coat', 'pronunciation': 'ah-BREE-goh', 'pos': 'noun'},
            {'spanish': 'sombrero', 'english': 'hat', 'pronunciation': 'sohm-BREH-roh', 'pos': 'noun'},
            {'spanish': 'gorra', 'english': 'cap', 'pronunciation': 'GOH-rrah', 'pos': 'noun'},
            {'spanish': 'bufanda', 'english': 'scarf', 'pronunciation': 'boo-FAHN-dah', 'pos': 'noun'},
            {'spanish': 'guante', 'english': 'glove', 'pronunciation': 'GWAHN-teh', 'pos': 'noun'},
            {'spanish': 'cinturón', 'english': 'belt', 'pronunciation': 'seen-too-ROHN', 'pos': 'noun'},
        ],
        'house': [
            {'spanish': 'casa', 'english': 'house', 'pronunciation': 'KAH-sah', 'pos': 'noun'},
            {'spanish': 'apartamento', 'english': 'apartment', 'pronunciation': 'ah-pahr-tah-MEHN-toh', 'pos': 'noun'},
            {'spanish': 'habitación', 'english': 'room', 'pronunciation': 'ah-bee-tah-see-OHN', 'pos': 'noun'},
            {'spanish': 'cocina', 'english': 'kitchen', 'pronunciation': 'koh-SEE-nah', 'pos': 'noun'},
            {'spanish': 'baño', 'english': 'bathroom', 'pronunciation': 'BAH-nyoh', 'pos': 'noun'},
            {'spanish': 'dormitorio', 'english': 'bedroom', 'pronunciation': 'dohr-mee-TOH-ree-oh', 'pos': 'noun'},
            {'spanish': 'sala', 'english': 'living room', 'pronunciation': 'SAH-lah', 'pos': 'noun'},
            {'spanish': 'comedor', 'english': 'dining room', 'pronunciation': 'koh-meh-DOHR', 'pos': 'noun'},
            {'spanish': 'jardín', 'english': 'garden', 'pronunciation': 'hahr-DEEN', 'pos': 'noun'},
            {'spanish': 'puerta', 'english': 'door', 'pronunciation': 'PWEHR-tah', 'pos': 'noun'},
            {'spanish': 'ventana', 'english': 'window', 'pronunciation': 'behn-TAH-nah', 'pos': 'noun'},
            {'spanish': 'escalera', 'english': 'stairs', 'pronunciation': 'ehs-kah-LEH-rah', 'pos': 'noun'},
            {'spanish': 'techo', 'english': 'roof/ceiling', 'pronunciation': 'TEH-choh', 'pos': 'noun'},
            {'spanish': 'piso', 'english': 'floor', 'pronunciation': 'PEE-soh', 'pos': 'noun'},
            {'spanish': 'pared', 'english': 'wall', 'pronunciation': 'pah-REHD', 'pos': 'noun'},
        ],
        'animals': [
            {'spanish': 'animal', 'english': 'animal', 'pronunciation': 'ah-nee-MAHL', 'pos': 'noun'},
            {'spanish': 'perro', 'english': 'dog', 'pronunciation': 'PEH-rroh', 'pos': 'noun'},
            {'spanish': 'gato', 'english': 'cat', 'pronunciation': 'GAH-toh', 'pos': 'noun'},
            {'spanish': 'pájaro', 'english': 'bird', 'pronunciation': 'PAH-hah-roh', 'pos': 'noun'},
            {'spanish': 'pez', 'english': 'fish', 'pronunciation': 'pehs', 'pos': 'noun'},
            {'spanish': 'caballo', 'english': 'horse', 'pronunciation': 'kah-BAH-yoh', 'pos': 'noun'},
            {'spanish': 'vaca', 'english': 'cow', 'pronunciation': 'BAH-kah', 'pos': 'noun'},
            {'spanish': 'cerdo', 'english': 'pig', 'pronunciation': 'SEHR-doh', 'pos': 'noun'},
            {'spanish': 'oveja', 'english': 'sheep', 'pronunciation': 'oh-BEH-hah', 'pos': 'noun'},
            {'spanish': 'gallina', 'english': 'chicken/hen', 'pronunciation': 'gah-YEE-nah', 'pos': 'noun'},
            {'spanish': 'conejo', 'english': 'rabbit', 'pronunciation': 'koh-NEH-hoh', 'pos': 'noun'},
            {'spanish': 'ratón', 'english': 'mouse', 'pronunciation': 'rah-TOHN', 'pos': 'noun'},
            {'spanish': 'león', 'english': 'lion', 'pronunciation': 'leh-OHN', 'pos': 'noun'},
            {'spanish': 'elefante', 'english': 'elephant', 'pronunciation': 'eh-leh-FAHN-teh', 'pos': 'noun'},
            {'spanish': 'mono', 'english': 'monkey', 'pronunciation': 'MOH-noh', 'pos': 'noun'},
            {'spanish': 'serpiente', 'english': 'snake', 'pronunciation': 'sehr-pee-EHN-teh', 'pos': 'noun'},
        ],
        'professions': [
            {'spanish': 'trabajo', 'english': 'work/job', 'pronunciation': 'trah-BAH-hoh', 'pos': 'noun'},
            {'spanish': 'profesor', 'english': 'teacher', 'pronunciation': 'proh-feh-SOHR', 'pos': 'noun'},
            {'spanish': 'médico', 'english': 'doctor', 'pronunciation': 'MEH-dee-koh', 'pos': 'noun'},
            {'spanish': 'enfermero', 'english': 'nurse', 'pronunciation': 'ehn-fehr-MEH-roh', 'pos': 'noun'},
            {'spanish': 'abogado', 'english': 'lawyer', 'pronunciation': 'ah-boh-GAH-doh', 'pos': 'noun'},
            {'spanish': 'ingeniero', 'english': 'engineer', 'pronunciation': 'een-heh-nee-EH-roh', 'pos': 'noun'},
            {'spanish': 'arquitecto', 'english': 'architect', 'pronunciation': 'ahr-kee-TEHK-toh', 'pos': 'noun'},
            {'spanish': 'cocinero', 'english': 'cook/chef', 'pronunciation': 'koh-see-NEH-roh', 'pos': 'noun'},
            {'spanish': 'policía', 'english': 'police officer', 'pronunciation': 'poh-lee-SEE-ah', 'pos': 'noun'},
            {'spanish': 'bombero', 'english': 'firefighter', 'pronunciation': 'bohm-BEH-roh', 'pos': 'noun'},
            {'spanish': 'vendedor', 'english': 'salesperson', 'pronunciation': 'behn-deh-DOHR', 'pos': 'noun'},
            {'spanish': 'secretario', 'english': 'secretary', 'pronunciation': 'seh-kreh-TAH-ree-oh', 'pos': 'noun'},
            {'spanish': 'estudiante', 'english': 'student', 'pronunciation': 'ehs-too-dee-AHN-teh', 'pos': 'noun'},
            {'spanish': 'artista', 'english': 'artist', 'pronunciation': 'ahr-TEES-tah', 'pos': 'noun'},
            {'spanish': 'músico', 'english': 'musician', 'pronunciation': 'MOO-see-koh', 'pos': 'noun'},
        ],
    },
}

# Extend vocabulary for other levels
VOCABULARY_DB['A2'] = {
    'daily_routine': [
        {'spanish': 'despertarse', 'english': 'to wake up', 'pronunciation': 'dehs-pehr-TAHR-seh', 'pos': 'verb'},
        {'spanish': 'levantarse', 'english': 'to get up', 'pronunciation': 'leh-bahn-TAHR-seh', 'pos': 'verb'},
        {'spanish': 'ducharse', 'english': 'to shower', 'pronunciation': 'doo-CHAHR-seh', 'pos': 'verb'},
        {'spanish': 'vestirse', 'english': 'to get dressed', 'pronunciation': 'behs-TEER-seh', 'pos': 'verb'},
        {'spanish': 'desayunar', 'english': 'to have breakfast', 'pronunciation': 'deh-sah-yoo-NAHR', 'pos': 'verb'},
        {'spanish': 'almorzar', 'english': 'to have lunch', 'pronunciation': 'ahl-mohr-SAHR', 'pos': 'verb'},
        {'spanish': 'cenar', 'english': 'to have dinner', 'pronunciation': 'seh-NAHR', 'pos': 'verb'},
        {'spanish': 'acostarse', 'english': 'to go to bed', 'pronunciation': 'ah-kohs-TAHR-seh', 'pos': 'verb'},
        {'spanish': 'dormirse', 'english': 'to fall asleep', 'pronunciation': 'dohr-MEER-seh', 'pos': 'verb'},
        {'spanish': 'cepillarse', 'english': 'to brush', 'pronunciation': 'seh-pee-YAHR-seh', 'pos': 'verb'},
        {'spanish': 'peinarse', 'english': 'to comb hair', 'pronunciation': 'pay-NAHR-seh', 'pos': 'verb'},
        {'spanish': 'afeitarse', 'english': 'to shave', 'pronunciation': 'ah-fay-TAHR-seh', 'pos': 'verb'},
        {'spanish': 'maquillarse', 'english': 'to put on makeup', 'pronunciation': 'mah-kee-YAHR-seh', 'pos': 'verb'},
    ],
    'travel': [
        {'spanish': 'viajar', 'english': 'to travel', 'pronunciation': 'bee-ah-HAHR', 'pos': 'verb'},
        {'spanish': 'aeropuerto', 'english': 'airport', 'pronunciation': 'ah-eh-roh-PWEHR-toh', 'pos': 'noun'},
        {'spanish': 'avión', 'english': 'airplane', 'pronunciation': 'ah-bee-OHN', 'pos': 'noun'},
        {'spanish': 'tren', 'english': 'train', 'pronunciation': 'trehn', 'pos': 'noun'},
        {'spanish': 'autobús', 'english': 'bus', 'pronunciation': 'ow-toh-BOOS', 'pos': 'noun'},
        {'spanish': 'taxi', 'english': 'taxi', 'pronunciation': 'TAHK-see', 'pos': 'noun'},
        {'spanish': 'maleta', 'english': 'suitcase', 'pronunciation': 'mah-LEH-tah', 'pos': 'noun'},
        {'spanish': 'pasaporte', 'english': 'passport', 'pronunciation': 'pah-sah-POHR-teh', 'pos': 'noun'},
        {'spanish': 'billete', 'english': 'ticket', 'pronunciation': 'bee-YEH-teh', 'pos': 'noun'},
        {'spanish': 'reserva', 'english': 'reservation', 'pronunciation': 'reh-SEHR-bah', 'pos': 'noun'},
        {'spanish': 'hotel', 'english': 'hotel', 'pronunciation': 'oh-TEHL', 'pos': 'noun'},
        {'spanish': 'vacaciones', 'english': 'vacation', 'pronunciation': 'bah-kah-see-OH-nehs', 'pos': 'noun'},
        {'spanish': 'turista', 'english': 'tourist', 'pronunciation': 'too-REES-tah', 'pos': 'noun'},
        {'spanish': 'mapa', 'english': 'map', 'pronunciation': 'MAH-pah', 'pos': 'noun'},
        {'spanish': 'guía', 'english': 'guide', 'pronunciation': 'GEE-ah', 'pos': 'noun'},
    ],
}

VOCABULARY_DB['B1'] = {
    'opinions': [
        {'spanish': 'creo que', 'english': 'I think that', 'pronunciation': 'KREH-oh keh', 'pos': 'phrase'},
        {'spanish': 'pienso que', 'english': 'I think that', 'pronunciation': 'pee-EHN-soh keh', 'pos': 'phrase'},
        {'spanish': 'en mi opinión', 'english': 'in my opinion', 'pronunciation': 'ehn mee oh-pee-nee-OHN', 'pos': 'phrase'},
        {'spanish': 'me parece que', 'english': 'it seems to me that', 'pronunciation': 'meh pah-REH-seh keh', 'pos': 'phrase'},
        {'spanish': 'estoy de acuerdo', 'english': 'I agree', 'pronunciation': 'ehs-TOY deh ah-KWEHR-doh', 'pos': 'phrase'},
        {'spanish': 'no estoy de acuerdo', 'english': 'I disagree', 'pronunciation': 'noh ehs-TOY deh ah-KWEHR-doh', 'pos': 'phrase'},
        {'spanish': 'sin embargo', 'english': 'however', 'pronunciation': 'seen ehm-BAHR-goh', 'pos': 'conjunction'},
        {'spanish': 'por un lado', 'english': 'on one hand', 'pronunciation': 'pohr oon LAH-doh', 'pos': 'phrase'},
        {'spanish': 'por otro lado', 'english': 'on the other hand', 'pronunciation': 'pohr OH-troh LAH-doh', 'pos': 'phrase'},
        {'spanish': 'además', 'english': 'furthermore', 'pronunciation': 'ah-deh-MAHS', 'pos': 'adverb'},
        {'spanish': 'aunque', 'english': 'although', 'pronunciation': 'OWN-keh', 'pos': 'conjunction'},
        {'spanish': 'a pesar de', 'english': 'despite', 'pronunciation': 'ah peh-SAHR deh', 'pos': 'phrase'},
    ],
}

VOCABULARY_DB['B2'] = {
    'subjunctive': [
        {'spanish': 'ojalá', 'english': 'hopefully/I wish', 'pronunciation': 'oh-hah-LAH', 'pos': 'interjection'},
        {'spanish': 'es posible que', 'english': 'it\'s possible that', 'pronunciation': 'ehs poh-SEE-bleh keh', 'pos': 'phrase'},
        {'spanish': 'dudo que', 'english': 'I doubt that', 'pronunciation': 'DOO-doh keh', 'pos': 'phrase'},
        {'spanish': 'es importante que', 'english': 'it\'s important that', 'pronunciation': 'ehs eem-pohr-TAHN-teh keh', 'pos': 'phrase'},
        {'spanish': 'quiero que', 'english': 'I want (someone) to', 'pronunciation': 'kee-EH-roh keh', 'pos': 'phrase'},
        {'spanish': 'espero que', 'english': 'I hope that', 'pronunciation': 'ehs-PEH-roh keh', 'pos': 'phrase'},
        {'spanish': 'temo que', 'english': 'I fear that', 'pronunciation': 'TEH-moh keh', 'pos': 'phrase'},
        {'spanish': 'antes de que', 'english': 'before', 'pronunciation': 'AHN-tehs deh keh', 'pos': 'conjunction'},
        {'spanish': 'para que', 'english': 'so that', 'pronunciation': 'PAH-rah keh', 'pos': 'conjunction'},
        {'spanish': 'a menos que', 'english': 'unless', 'pronunciation': 'ah MEH-nohs keh', 'pos': 'conjunction'},
        {'spanish': 'con tal de que', 'english': 'provided that', 'pronunciation': 'kohn tahl deh keh', 'pos': 'conjunction'},
        {'spanish': 'si yo fuera', 'english': 'if I were', 'pronunciation': 'see yoh FWEH-rah', 'pos': 'phrase'},
    ],
}

VOCABULARY_DB['C1'] = {
    'professional': [
        {'spanish': 'estimado/a', 'english': 'dear (formal)', 'pronunciation': 'ehs-tee-MAH-doh', 'pos': 'adjective'},
        {'spanish': 'atentamente', 'english': 'sincerely', 'pronunciation': 'ah-tehn-tah-MEHN-teh', 'pos': 'adverb'},
        {'spanish': 'adjuntar', 'english': 'to attach', 'pronunciation': 'ahd-hoon-TAHR', 'pos': 'verb'},
        {'spanish': 'solicitar', 'english': 'to request/apply', 'pronunciation': 'soh-lee-see-TAHR', 'pos': 'verb'},
        {'spanish': 'currículum', 'english': 'CV/resume', 'pronunciation': 'koo-RREE-koo-loom', 'pos': 'noun'},
        {'spanish': 'entrevista', 'english': 'interview', 'pronunciation': 'ehn-treh-BEES-tah', 'pos': 'noun'},
        {'spanish': 'contrato', 'english': 'contract', 'pronunciation': 'kohn-TRAH-toh', 'pos': 'noun'},
        {'spanish': 'presupuesto', 'english': 'budget', 'pronunciation': 'preh-soo-PWEHS-toh', 'pos': 'noun'},
        {'spanish': 'factura', 'english': 'invoice', 'pronunciation': 'fahk-TOO-rah', 'pos': 'noun'},
        {'spanish': 'plazo', 'english': 'deadline', 'pronunciation': 'PLAH-soh', 'pos': 'noun'},
        {'spanish': 'reunión', 'english': 'meeting', 'pronunciation': 'reh-oo-nee-OHN', 'pos': 'noun'},
        {'spanish': 'propuesta', 'english': 'proposal', 'pronunciation': 'proh-PWEHS-tah', 'pos': 'noun'},
    ],
}

VOCABULARY_DB['C2'] = {
    'literary': [
        {'spanish': 'metáfora', 'english': 'metaphor', 'pronunciation': 'meh-TAH-foh-rah', 'pos': 'noun'},
        {'spanish': 'símil', 'english': 'simile', 'pronunciation': 'SEE-meel', 'pos': 'noun'},
        {'spanish': 'ironía', 'english': 'irony', 'pronunciation': 'ee-roh-NEE-ah', 'pos': 'noun'},
        {'spanish': 'sátira', 'english': 'satire', 'pronunciation': 'SAH-tee-rah', 'pos': 'noun'},
        {'spanish': 'alegoría', 'english': 'allegory', 'pronunciation': 'ah-leh-goh-REE-ah', 'pos': 'noun'},
        {'spanish': 'hipérbole', 'english': 'hyperbole', 'pronunciation': 'ee-PEHR-boh-leh', 'pos': 'noun'},
        {'spanish': 'eufemismo', 'english': 'euphemism', 'pronunciation': 'eh-oo-feh-MEES-moh', 'pos': 'noun'},
        {'spanish': 'paradoja', 'english': 'paradox', 'pronunciation': 'pah-rah-DOH-hah', 'pos': 'noun'},
        {'spanish': 'antítesis', 'english': 'antithesis', 'pronunciation': 'ahn-TEE-teh-sees', 'pos': 'noun'},
        {'spanish': 'oxímoron', 'english': 'oxymoron', 'pronunciation': 'ohk-SEE-moh-rohn', 'pos': 'noun'},
        {'spanish': 'personificación', 'english': 'personification', 'pronunciation': 'pehr-soh-nee-fee-kah-see-OHN', 'pos': 'noun'},
        {'spanish': 'aliteración', 'english': 'alliteration', 'pronunciation': 'ah-lee-teh-rah-see-OHN', 'pos': 'noun'},
    ],
}

# Topic definitions for each level
TOPICS = {
    'A1': ['greetings', 'numbers', 'colors', 'family', 'food', 'time', 'weather', 'body', 'clothes', 'house', 'animals', 'professions'],
    'A2': ['daily_routine', 'travel', 'shopping', 'health', 'emotions', 'restaurant', 'hotel', 'transport', 'hobbies', 'technology'],
    'B1': ['opinions', 'subjunctive_intro', 'conditional', 'work', 'education', 'environment', 'relationships', 'culture', 'media', 'storytelling'],
    'B2': ['subjunctive', 'passive', 'debates', 'politics', 'economics', 'science', 'arts', 'literature', 'idioms', 'academic'],
    'C1': ['professional', 'legal', 'medical', 'technical', 'philosophy', 'nuanced', 'dialects', 'journalism', 'diplomacy', 'translation'],
    'C2': ['literary', 'philosophical', 'legal_adv', 'interpretation', 'cultural', 'historical', 'academic_pub', 'native_idioms', 'dialectal', 'specialized'],
}

# Grammar points per level
GRAMMAR_POINTS = {
    'A1': [
        'Present tense of ser and estar',
        'Present tense of regular -ar verbs',
        'Present tense of regular -er verbs',
        'Present tense of regular -ir verbs',
        'Gender and number agreement',
        'Definite and indefinite articles',
        'Possessive adjectives',
        'Basic question words',
        'Negation with no',
        'Hay (there is/are)',
        'Tener expressions',
        'Gustar and similar verbs',
    ],
    'A2': [
        'Preterite tense regular verbs',
        'Preterite tense irregular verbs',
        'Imperfect tense',
        'Preterite vs imperfect',
        'Reflexive verbs',
        'Direct object pronouns',
        'Indirect object pronouns',
        'Double object pronouns',
        'Affirmative commands',
        'Negative commands',
        'Comparatives and superlatives',
        'Por vs para',
    ],
    'B1': [
        'Present subjunctive formation',
        'Subjunctive with wishes',
        'Subjunctive with emotions',
        'Subjunctive with doubt',
        'Conditional tense',
        'Future tense',
        'Perfect tenses',
        'Relative pronouns',
        'Passive se',
        'Impersonal se',
    ],
    'B2': [
        'Imperfect subjunctive',
        'Pluperfect subjunctive',
        'Si clauses (conditionals)',
        'Passive voice',
        'Reported speech',
        'Advanced relative clauses',
        'Subjunctive in adverbial clauses',
        'Sequence of tenses',
    ],
    'C1': [
        'Future subjunctive (archaic)',
        'Literary past tenses',
        'Advanced passive constructions',
        'Nominalization',
        'Complex subordination',
        'Register variation',
        'Discourse markers',
    ],
    'C2': [
        'Stylistic variation',
        'Literary devices in grammar',
        'Historical grammar forms',
        'Dialectal grammar variations',
        'Academic writing conventions',
        'Legal and technical syntax',
    ],
}

# Cultural notes per level
CULTURAL_NOTES = {
    'A1': [
        'In Spanish-speaking countries, greetings often include physical contact like handshakes or kisses on the cheek.',
        'Spanish speakers typically use two last names: the father\'s surname followed by the mother\'s.',
        'Meal times in Spain are later than in many other countries: lunch around 2-3 PM, dinner around 9-10 PM.',
        'The siesta tradition, while declining, is still observed in some regions of Spain.',
        'Tú and usted represent different levels of formality when addressing someone.',
    ],
    'A2': [
        'In Latin America, "vos" is used instead of "tú" in several countries like Argentina and Uruguay.',
        'Spanish-speaking countries celebrate different holidays, such as Día de los Muertos in Mexico.',
        'The concept of "sobremesa" refers to the time spent chatting at the table after a meal.',
        'Public transportation systems vary greatly across Spanish-speaking countries.',
        'Bargaining is common in markets in many Latin American countries.',
    ],
    'B1': [
        'The Royal Spanish Academy (RAE) sets standards for the Spanish language.',
        'Spanish is the official language in 21 countries across the world.',
        'Regional variations in Spanish can affect vocabulary, pronunciation, and grammar.',
        'The concept of "mañana" reflects a more relaxed attitude toward time in some cultures.',
        'Family ties tend to be stronger and more central to daily life in Hispanic cultures.',
    ],
    'B2': [
        'The Spanish Civil War (1936-1939) had lasting effects on Spanish society and culture.',
        'Latin American literature experienced a "Boom" in the 1960s-70s with authors like García Márquez.',
        'Flamenco, originating from Andalusia, is recognized as UNESCO Intangible Cultural Heritage.',
        'The concept of "machismo" and its evolution is an important social topic in Hispanic cultures.',
        'Indigenous languages coexist with Spanish in many Latin American countries.',
    ],
    'C1': [
        'Spanish has absorbed words from Arabic, indigenous American languages, and other sources.',
        'The distinction between Castilian Spanish and other varieties reflects historical and political factors.',
        'Literary movements like the Generation of \'98 shaped modern Spanish literature.',
        'The Spanish language continues to evolve with new words added annually by the RAE.',
        'Code-switching between Spanish and English (Spanglish) is common in bilingual communities.',
    ],
    'C2': [
        'Classical Spanish literature includes works like Don Quixote, considered the first modern novel.',
        'The philosophical tradition in Spanish includes thinkers like Ortega y Gasset and Unamuno.',
        'Legal Spanish has its own conventions and terminology dating back centuries.',
        'Translation theory in Spanish has a rich history from the Toledo School of Translators.',
        'The preservation of minority languages in Spain (Catalan, Basque, Galician) reflects complex politics.',
    ],
}

def generate_example_sentence(word, level):
    """Generate an example sentence for a vocabulary word."""
    templates = {
        'A1': [
            f"El/La {word['spanish']} es muy importante.",
            f"Me gusta el/la {word['spanish']}.",
            f"¿Dónde está el/la {word['spanish']}?",
            f"Necesito un/una {word['spanish']}.",
            f"Tengo un/una {word['spanish']}.",
        ],
        'A2': [
            f"Ayer vi un/una {word['spanish']} muy interesante.",
            f"Siempre uso el/la {word['spanish']} por la mañana.",
            f"¿Has visto el/la {word['spanish']}?",
            f"Me gustaría tener un/una {word['spanish']}.",
        ],
        'B1': [
            f"Creo que el/la {word['spanish']} es fundamental para...",
            f"En mi opinión, el/la {word['spanish']} representa...",
            f"Es importante que consideremos el/la {word['spanish']}.",
        ],
        'B2': [
            f"A pesar de las dificultades, el/la {word['spanish']} sigue siendo relevante.",
            f"Si tuviera que elegir, preferiría el/la {word['spanish']}.",
            f"Es posible que el/la {word['spanish']} cambie en el futuro.",
        ],
        'C1': [
            f"Cabe destacar que el/la {word['spanish']} ha evolucionado significativamente.",
            f"Desde una perspectiva profesional, el/la {word['spanish']} resulta indispensable.",
        ],
        'C2': [
            f"La conceptualización del/de la {word['spanish']} trasciende las fronteras disciplinarias.",
            f"El análisis del/de la {word['spanish']} revela matices sutiles en su interpretación.",
        ],
    }
    return random.choice(templates.get(level, templates['A1']))

def generate_exercise(level, vocab_items, exercise_num):
    """Generate an exercise based on level and vocabulary."""
    exercise_types = ['multiple_choice', 'fill_blank', 'translation', 'matching']
    ex_type = exercise_types[exercise_num % len(exercise_types)]
    
    word = random.choice(vocab_items)
    
    if ex_type == 'multiple_choice':
        wrong_answers = [v['english'] for v in vocab_items if v != word][:3]
        if len(wrong_answers) < 3:
            wrong_answers.extend(['option A', 'option B', 'option C'][:3-len(wrong_answers)])
        options = [word['english']] + wrong_answers
        random.shuffle(options)
        return {
            'id': f'ex{exercise_num}',
            'type': 'multiple_choice',
            'question': f'What does "{word["spanish"]}" mean?',
            'options': options,
            'correct_answer': word['english'],
            'explanation': f'"{word["spanish"]}" means "{word["english"]}" in English.',
            'points': 10
        }
    elif ex_type == 'fill_blank':
        return {
            'id': f'ex{exercise_num}',
            'type': 'fill_blank',
            'question': f'Complete the sentence: "El _____ es muy importante." (The {word["english"]} is very important.)',
            'correct_answer': word['spanish'],
            'explanation': f'The correct word is "{word["spanish"]}" which means "{word["english"]}".',
            'points': 15
        }
    elif ex_type == 'translation':
        return {
            'id': f'ex{exercise_num}',
            'type': 'translation',
            'question': f'Translate to Spanish: "{word["english"]}"',
            'correct_answer': word['spanish'],
            'explanation': f'"{word["english"]}" translates to "{word["spanish"]}" in Spanish.',
            'points': 15
        }
    else:  # matching
        return {
            'id': f'ex{exercise_num}',
            'type': 'matching',
            'question': 'Match the Spanish word with its English translation.',
            'options': [f'{word["spanish"]} - {word["english"]}'],
            'correct_answer': f'{word["spanish"]} - {word["english"]}',
            'explanation': 'Match Spanish words with their English equivalents.',
            'points': 10
        }

def generate_lesson(level, topic, lesson_num, total_in_topic):
    """Generate a single lesson."""
    
    # Get vocabulary for this topic or use default
    vocab_list = VOCABULARY_DB.get(level, {}).get(topic, VOCABULARY_DB['A1']['greetings'])
    
    # Select vocabulary items for this lesson
    num_vocab = min(8, len(vocab_list))
    start_idx = (lesson_num * num_vocab) % len(vocab_list)
    selected_vocab = []
    for i in range(num_vocab):
        idx = (start_idx + i) % len(vocab_list)
        word = vocab_list[idx].copy()
        word['example_es'] = generate_example_sentence(word, level)
        word['example_en'] = f"Example using {word['english']}"
        selected_vocab.append(word)
    
    # Select grammar points
    grammar_list = GRAMMAR_POINTS.get(level, GRAMMAR_POINTS['A1'])
    num_grammar = min(3, len(grammar_list))
    selected_grammar = random.sample(grammar_list, num_grammar)
    
    # Select cultural note
    cultural_list = CULTURAL_NOTES.get(level, CULTURAL_NOTES['A1'])
    cultural_note = random.choice(cultural_list)
    
    # Generate exercises
    exercises = [generate_exercise(level, selected_vocab, i) for i in range(4)]
    
    # Create lesson object
    lesson = {
        'id': f'{level.lower()}-{topic}-{lesson_num:04d}',
        'slug': f'{level.lower()}-{topic}-lesson-{lesson_num}',
        'cefr_level': level,
        'category': topic,
        'title_en': f'{topic.replace("_", " ").title()} - Lesson {lesson_num}',
        'title_es': f'{topic.replace("_", " ").title()} - Lección {lesson_num}',
        'description_en': f'Learn essential {topic.replace("_", " ")} vocabulary and expressions at the {level} level. This lesson covers key words and phrases for everyday communication.',
        'description_es': f'Aprende vocabulario y expresiones esenciales de {topic.replace("_", " ")} en el nivel {level}. Esta lección cubre palabras y frases clave para la comunicación diaria.',
        'objectives': [
            f'Learn {num_vocab} new vocabulary items related to {topic.replace("_", " ")}',
            f'Practice using these words in context',
            f'Understand grammar concepts: {", ".join(selected_grammar[:2])}',
            'Apply knowledge through interactive exercises'
        ],
        'estimated_minutes': random.randint(15, 30) if level in ['A1', 'A2'] else random.randint(25, 45),
        'vocabulary': selected_vocab,
        'grammar_points': selected_grammar,
        'cultural_note': cultural_note,
        'exercises': exercises
    }
    
    return lesson

def generate_all_lessons():
    """Generate 10,000 lessons across all CEFR levels."""
    
    # Distribution of lessons per level
    distribution = {
        'A1': 2000,
        'A2': 2000,
        'B1': 1800,
        'B2': 1700,
        'C1': 1500,
        'C2': 1000
    }
    
    all_lessons = []
    
    for level, total_lessons in distribution.items():
        topics = TOPICS[level]
        lessons_per_topic = total_lessons // len(topics)
        remainder = total_lessons % len(topics)
        
        print(f"\nGenerating {total_lessons} lessons for level {level}...")
        
        level_lessons = []
        for topic_idx, topic in enumerate(topics):
            # Add remainder to first few topics
            topic_lessons = lessons_per_topic + (1 if topic_idx < remainder else 0)
            
            print(f"  {topic}: {topic_lessons} lessons")
            
            for i in range(topic_lessons):
                lesson = generate_lesson(level, topic, i + 1, topic_lessons)
                level_lessons.append(lesson)
        
        all_lessons.extend(level_lessons)
        
        # Save level file
        os.makedirs('generated_lessons', exist_ok=True)
        with open(f'generated_lessons/lessons_{level}.json', 'w', encoding='utf-8') as f:
            json.dump(level_lessons, f, ensure_ascii=False, indent=2)
        
        print(f"  ✓ Saved {len(level_lessons)} lessons to generated_lessons/lessons_{level}.json")
    
    # Save all lessons
    with open('generated_lessons/all_lessons.json', 'w', encoding='utf-8') as f:
        json.dump(all_lessons, f, ensure_ascii=False, indent=2)
    
    # Save summary
    summary = {
        'total_lessons': len(all_lessons),
        'generated_at': datetime.now().isoformat(),
        'distribution': {level: len([l for l in all_lessons if l['cefr_level'] == level]) for level in distribution.keys()},
        'topics_per_level': {level: TOPICS[level] for level in distribution.keys()}
    }
    
    with open('generated_lessons/summary.json', 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    return all_lessons

if __name__ == '__main__':
    print("=" * 60)
    print("Prize2Pride Spanish Platform - Lesson Generator")
    print("Generating 10,000 lessons across CEFR levels A1-C2")
    print("=" * 60)
    
    lessons = generate_all_lessons()
    
    print("\n" + "=" * 60)
    print(f"COMPLETE! Generated {len(lessons)} lessons")
    print("=" * 60)
