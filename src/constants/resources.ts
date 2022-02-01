

export const resources : any = {
    eng : {
      APP : {
          ALERTS: {
            NOT_FOUND: "Word not found.",
            LOST: (solution: string) => `You lost, the word was ${solution}.`,
            COPIED: "Game copied to clipboard."
          },
          KEYS: {
            ENTER: "Enter",
            DELETE: "Delete"
          }
      },
      COMPONENTS: {
          MODALS: {
              ABOUT: {
                  TITLE: "About this game",
                  START: (language: string) =>
                  `This is an open source clone of the game Wordle adapted to ${language} by `,
                  CHECKOUT: ". Check out ",
                  ORIGINAL_CODE: "the original code",
                  BY: " by ",
                  LOOK_AT: " or have a look at ",
                  CUSTOMIZE: " and customize it for another language! ",
                  WORD_SOURCE: "The words for this Wordle were sourced from ",
                  PLAY_ORIGINAL: ". View the original game ",
                  ORIGINAL_LINK: "here."
              },
              INFO: {
                TITLE: "How to play",
                INSTRUCTIONS: (tries: string) => `Guess the word in ${tries} tries. After each guess, the color of the tiles will change to show how close your guess was to the word.`,
                EXPLAIN_GREEN: "The letter L is in the word and in the correct spot.",
                EXPLAIN_YELLOW: "The letter O is in the word but in the wrong spot.",
                EXPLAIN_GRAY: "The letter N is not in the word in any spot."
              },
              WIN: {
                TITLE: "You Won!",
                GREAT_JOB: "Great job!",
                SHARE: "Share"
              }
          }
      }
    }, 
    haw : {
        APP : {
            ALERTS: {
              NOT_FOUND: "‘A‘ole i loa‘a ka hua‘ōlelo.",
              LOST: (solution: string) => `Ua nalowale ‘oe, ${solution} ka hua‘ōlelo.`,
              COPIED: "Ua kope ʻia ka pāʻani i ka papa paʻi."
            },
            KEYS: {
              ENTER: "Komo",
              DELETE: "Holoi"
            }
        },
        COMPONENTS: {
            MODALS: {
                ABOUT: {
                    TITLE: "E pili ana ka pāʻani",
                    START: (language: string) =>
                    `He clone kumu hāmama kēia o ka pāʻani Wordle i hoʻololi ʻia i ka ${language} e `,
                    CHECKOUT: ". E nānā i ",
                    ORIGINAL_CODE: "ke kumu hua ʻālualua", 
                    BY: " e ",
                    LOOK_AT: " a i ʻole e nānā i ",
                    CUSTOMIZE: " a hoʻopilikino iā ia no ka ʻōlelo ʻē aʻe! ",
                    WORD_SOURCE: "Ua loaʻa nā huaʻōlelo no kēia Wordle mai ",
                    PLAY_ORIGINAL: "E nānā i ka pāʻani kumu ",
                    ORIGINAL_LINK: "ma ʻaneʻi."
                },
                INFO: {
                  TITLE: "Pehea e pāʻani ai",
                  INSTRUCTIONS: (tries: string) => `He ${tries} kāu hoʻāʻo e koho i ka huaʻōlelo. Ma hope o kēlā me kēia koho ʻana, e hoʻololi ke kala o nā kile e hōʻike i ka pili o kāu koho ʻana i ka huaʻōlelo.`,
                  EXPLAIN_GREEN: "Aia ka hua palapala 'L' ma ka hua'ōlelo a ma kahi kūpono.",
                  EXPLAIN_YELLOW: "Aia ka hua palapala 'O' i ka huaʻōlelo akā ma kahi hewa.",
                  EXPLAIN_GRAY: "ʻAʻole ka hua palapala 'N' i ka huaʻōlelo ma kekahi wahi."
                },
                WIN: {
                  TITLE: "Ua lanakila ‘oe!",
                  GREAT_JOB: "Maika‘i kau hana!",
                  SHARE: "Kūkala"
                }
            }
        }
    }
  }