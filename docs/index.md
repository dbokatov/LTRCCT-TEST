# Welcome to LTRCOL-2296
# From Good to Great - Enhancing Customer Experience with the Webex Contact Center Flow Designer

## Schedule
| Time           | Description                          | Type           |
| :------------: | :----------------------------------: | :------------: |
| `9:00 - 9:20`  | Introduction  | Presentation |
| `9:20 - 9:40`  | 1st Mission | together |
| `9:40 - 11:00` | Main Missions | independently |
| `11:00 - 11:15` | Break | together |
| `11:15 - 11:30` | QUIZ | together |
| `11:30 - 12:30` | Advanced Missions (self task) | independently |
| `12:30 - 13:00` | Boss | independently |

## Missions



``` mermaid
stateDiagram-v2
join_state --> "Main Missions"
  state fork_state <<fork>>
    [*] --> fork_state
    fork_state --> "Using Flow Templates"
    fork_state --> "Routing Based on Language Preference"
    fork_state --> "Using Business Hours"
    fork_state --> "Subflows"

    state join_state <<join>>
    "Using Flow Templates" --> join_state
    "Routing Based on Language Preference" --> join_state
    "Using Business Hours" --> join_state
    "Subflows" --> join_state
    join_state --> "Advanced Missions"
    State4 --> [*]
```

