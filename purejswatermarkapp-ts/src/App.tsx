import * as React from "react";
import "./App.scss";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import CreatePost2AddrPhotos from "./components/CreatePost2AddrPhotos";

//some testing programs
// import TestWorldCities from "./tests/testWorldCities";
import Photo from "./tests/modularScss/Photo";

// import {
//     getCSRFToken
// } from "./store/csrf/CSRFActionsCreatorSaga";
//import { CSRFTypes } from "./store/csrf/CSRFTypes";

//---new store combined from multiple stores and multiple reducers ---
import {createBrowserHistory} from "history";

//convert this thiing into a buffer and if it works

const myGifBuffer =
  "data:image/gif;base64,R0lGODlhPAA4APf/AJbFRMrhoO724XWSM/r89pHCPIu/Moa8KeLi3XenHNnqvMHdkY3ANfD35avQaa3Sbv7+/YilSqTMXXp3Yu313qjOY5nGSWJvMrXWfNrZ053JUfP46ejy1/n5+KbNYN/txsvipNXotdzswsjhnYO6I+nz2GdkTLHUdWyVGbTVedjqury7sbvZhpDBOfX57cTelqDKVXVyXKLLWPz8/MXfmK7ScPv7+vj78s/kqeTw0NTnsqupnPb29JzITubl4VlmJdHlrPf68Ii9LOPwzp/JVFp4ErnYgoOAbXywHZyai4S7JOjo5Ozs6ZaTg2tnUODuyTxECpXEQqSilLzaiPb672WJFr/bjVVtE9HQydPmsJutb5rHTMfFvWJeRvT08uPvzdXUzWGDFc7Nxefy1NLmr42LeC4tBFFNMjEsDLOxptfpuLPVeba0qTEzBYW7J8rJwObx0sHAt7K7l6/Tck1JLsfgnEdXDPHw7llVPPLx74iGc0VLFikkA4qIdXyfNjgzFYB9acPelEE9HzYxEpW1V0pGKjQzDYWiRl9bQsLJrI6zR46Ya3GdGi4pCTU5Bn+2H0hSFVFTK8jTrXmDUpG7RcTDukZCJpCNfISPXComBKq4hzo+DVtYP66soIaEcaCejz05G2t1QN7d2I2jWFRQNm9sVdLVw7CuolZSOJiWhr+9tKmnmru5r7i3rMzKwsLBuE1hDkFMCjw8E5XCRmeCI1tcN1FdHpzBVmiPF5bBSjg+Bzo2GI23QCgjAl9/FFFnDzc3DisnBf3++4G5IIK6IY/BOMDcj/n89OHvyvz9+vv99+v03PX67bjXgZTDQIq+L6PMW/T564e9Kuv024m+LtDlq/r89anPZpfFR7/cjqPMXJPDP77bi/L46LfXf6zRa83jpu/v7Nvrv+zr6PDv7eLvyzMvD9DPx6elmL3aieHg25qXiMjHv9TTzJORgE9ML9jX0dfWz6uxktvjyIK5IqrEdszPvbjCnuHo0GiMG9jazNfdxpnES01WHYG5H////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjE3QkI3MUM5Nzc0REUzMTFBMDAyRDYxNDg2RjEyQ0QyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5MkE1OEY2Nzk0ODExRTNBRDNFODYyRjQ3NUYzOEJGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5MkE1OEY1Nzk0ODExRTNBRDNFODYyRjQ3NUYzOEJGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MWRjODI2ZS1lNGFlLTY1NDItYjBmNi00OTYxM2U3NDUwZTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTdCQjcxQzk3NzRERTMxMUEwMDJENjE0ODZGMTJDRDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFAwD/ACwAAAAAPAA4AAAIXwD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjngwIACH5BAUDAP8ALBkANgAKAAIAAAgUAP8JHDhjYId/8TrVCmUilbo7AQEAIfkEBQMA/wAsGQA2AAsAAgAACBkA/wn85wVfq38zBHphkuaIIFi9BsVoxSMgACH5BAUDAP8ALBgANgANAAIAAAgaAP8JFGjvliB3SwZ6UafqCJ5GsXpJ5CSlQ0AAIfkEBQMA/wAsGAA1AA4AAwAACCQA/wkc+EFeq4EIBaor86hNLzw7IAjMsOJIoV29YA3M9GeduoAAIfkEBQMA/wAsFwA0ABAABAAACC0A/wkcKFDKEoIIB0IgxAdUqhkJBfLYEclOr4uCmvAQmIdNGUtoLooUuWtdh4AAIfkEBQMA/wAsFQA0ABMABAAACDQA/wkcOPAErQs+CCpUKOeRmV7BjqhbKDAcgiaCDBHshQbQxH8z/qVxYqkXn38nFXIEtCQgACH5BAUDAP8ALBUAMwATAAUAAAg6AP8JHDiQjBY5BBMqVPAoVi8nHRQmnFHph69eGHvtiKhQ1ZFBvcyYyYjxTKuIPMSYMEeyZcZMqDIEBAAh+QQFAwD/ACwVADIAFAAGAAAIRgD/CRw4MECKeR0IKlwYwt8jSLVELZz475a/X7167UpCUaC6HWcgheGTsRcfROEUMuGCZ1fGYCVj9kInkMsEQTJzxizUISAAIfkEBQMA/wAsEwAxABcABwAACFEA/wkcSPCfihM6Cipc+G8MCX+M9sxgSPGEvwRm+KDJQLGgFy5+kDjqRbKXlI4zmPQ50yuWrpIlY/BQCIFLKZh8YMIU5ErgDB59CukcOnTHjIAAIfkEBQMA/wAsEwAwABcACAAACFoA/wkcSPDfsRzHCipc+E8AA3/UNM1gSPGEv39hggHiQVEhDwb/qmTq1avLuI4D06CqUiUYQUsZKI5LNajXP12OFP5hoxALoEwoBQbTMzGPmDNoFPKhyMeJl4AAIfkEBQMA/wAsEwAwABcACAAACF4A/wkcSLCbBmpzqBBcyHBgDX///A0g17Div2QHBPoyY0mdRYamHv3bKHAQl4//ZvgANAjFPzMEG+2wiAVRL4FQYC7M1AfCwk4mbqL816sLj39MOjXKxFBow150xgUEACH5BAUDAP8ALBMALwAXAAkAAAheAP8JHEhQWR0WHAgqXEhwjj9/JHQwnCgwGjGClSgyfOJvYLBeaTQqXNTxXyaBvS6J9HLqTK9/vk4O7DVh4h10gwbqCrawFyIeBDt4KqSQ50RB4/4huNTrpUiFf0QFBAAh+QQFAwD/ACwTAC8AFwAJAAAIXgD/CRxIcMQBZyEIKlw4UAAxgcQ+MJwoMIC/gaPAUGRoTOCjMGb+Vdo40EuSSQLDBBsoheQqVL1kfQxJUM9EVZZ6DbxCU2GpDgM7qKKzkmDPhYXC/VOFaCKfjYIQBAQAIfkEBQMA/wAsEwAvABcACQAACFkA/wkcSJAFCWziCCpcOHCMP4FKljGcuPCRFgQUMz5EMwhLxoHqnFwYJtCMwEZpMjKZgEagvyoK+axj2KFJy4G/gjGcMGNguCTB+MSkiCrPP3SFJvbKaMlHQAAh+QQFAwD/ACwTAC8AFwAJAAAIXwD/CRxI0JuBGi4IKlw48MnAKMkYShTIbaC/f+EmLgwXiqA5QaI0Dly1q1GCA1XaCBxUSeMKOr3+9fI1QGGjVQzVlYo50JGZhZn0EMwzIRPPgUcXdvHyb8cfkRLpLAkIACH5BAUDAP8ALBIALgAYAAoAAAhlAP8JHEjwX4kAAgoqXCiw2wF/bsgwnCiQxkBiyygynENwFA+NBV1d+EfiX5U2qJaA/EduQiND/wzgGigIC8UZ7nYNrOKnoLlWCyGoorOyURMIBDN06bVSIJ9SH8cdadS0IKpxAQEAIfkEBQMA/wAsEgAuABgACgAACGcA/wkcSJDCNgPGhBFcyJBgDX///D1oSJFglIH+PlSsWOzfMIGHyG1k2OnHPyEDC6kbKRAMHj7AkBQguIvdxnCAGg3E9a8NQTSdGvJAN4jlv2BlZhBcQcfowF4mvPwT1SWT04VnlgQEACH5BAUDAP8ALBIALQAYAAsAAAhpAP8JHEjw35McBRMqHJjNn78KVBZKFFhsYIWJC5X5w8hRyT+P/0Yt4TiQx6Ur/7YNBJWB5A5Lvf492kLQnKqJ8brEFIjiUMFGUhQyKcOnoJk2CTMdsTEQgpRdJAlyyvOv0pmiUQkW8hEQACH5BAkDAP8ALBIALQAYAAsAAAhpAP8JHEhwzBxjNwgqXKhwm8BiJRhKHCjA30AAySZKjEiwmkaGNywWEBhB3UeCHTzR+idj4KBzJ/+dEgjFnweCjdJoxIKHYIIICjOlYphHTy+FbRj2mtBh4Iwdf2ISJBXuH5eeUhVaQhAQACH5BAkDAP8ALAAAAAA8ADgAAAjAAP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSFFCECAsJwx/BnTc/OKv6jCpNclUrXpgQ00F/oiRqMqipoCqPar6ATRzCaJ8/ir4q2Km1wSYXtyZ6wVlWIUqmXoJ5uSylSDBghMM4INY8K6VGUw0Flx3suBBKHmUaWS5c+NM6kqmseS5dOMMEgMCACH5BAUDAP8ALAAAAAA8ADgAAAjAAP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSFGOeIBD2M0P/qJqoGJzQdSoMCDUNHY1Ko6aIfwJMRB1S00BUT1ExfVnicwOnsL4q+DvSq9ejcLBTGOpFxR6Hn7dvZupXcsMeAb3utJP8WBXKvPoQeO4smIxJ2d0+mO58+BOJbng4eO5dC90EgMCACH5BAkDAP8ALBMAKwAXAA0AAAh+AP8JHDiwBLgxBBMqJEhBiT9/344tnCiwzkB/PSRSVMiNoD8jGxUC+XfgmUASG0ISLPHPXw2BjzSpHChMyT8W/x4VQdNnJgR3P/5NQWIn2D8+7kKuoPNPFhJCe/gM5KNnIrwuBO20WdiTYLhLmWYKTPoPghRQYglWPZNWoZ6AACH5BAkDAP8ALAAAAAA8ADgAAAjUAP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qFGfG2AYcFDiJgt/UJXgsCkBKtRhIWo68EfCKgNlNEf429bDataZcPwRe2E1HU0IB/wFGAZ1VDiaGvyl2IKkSC9BPGTG+eHPWT1YvRKjCuwyg4lMwBKgiJS48mKWdwA1qhyrTeXPqDqk7LDjz+fTqE3YOKnqDOrXp52URGAiGOzblU1IDAgAIfkECQMA/wAsAAAAADwAOAAACN4A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSoUYHCXjyoc+NmHX9QGXywqQ0qVCVTaUKzGtUaTW7+ChSzCoSmOH9KrFitQfMGMX84rMqoGcUfCwD+hg1gRdOBPwDN/F3J1CuDzAwX/NGTZKeX42CGXXbw1MgcIxSWHGtGo65lkj+aY5nRTHoQk5QQ3pwh7ZgPa82Fwp1U1+W1bdZ0eJD0cgnN7d+az8yIGBAAIfkECQMA/wAsAAAAADwAOAAACOQA/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrRoww84KOCk4c8fsTUEbEZp2lRDVJoMqDZNUVOCv23DmhITQHOBvy3QqNKg+cEfCaZNa9A8RsxfgLr+HNTc5u9Ej6ZGaqbFxjTBO5pcLvgTkkwLml6CYo6L0chQAn9cHvfqNShPyw5l/mzuVQWX5tG9fKicwaoQ6l5tMr0erfpkPESzNwfLvXlFySWAdvPm04h3rx0SAwIAIfkECQMA/wAsAAAAADwAOAAACOYA/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodStQihA05SxjwV0DHzRr+ovozYrOH1KjValbwJ02qgWM0s/nTgE0qGZpq/AkxJpXqTAFRcUitQROCEn8BDkR1O7OFvxMeooaoacGfBxFCHgijGeeHvx7/vJRKIzODiUzAEmzjESNTL0Av8wBq1Kt0FTd9Spd+F27ljE5/VJd2VER26UFYUroiZVt1sN6lm5hE0Bm4cdlO8kgMCAAh+QQJAwD/ACwAAAAAPAA4AAAI6gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1K1CIQCz0WELCJzJ9Tf9ii1Uz31KkGYTRZVHUagCY4fwZkPN1C84M/YjieDqMys4FTEVVLzEw2zF+1Ak8p0DTgz5sDpwewzsTmz8FXfxhqavAnA4IOcRBodvrhz4JNV3j4AEPS4t+KM6JgLonRq3QvXAcyBOuFZh0Plh1SDTJd2hGSXbRJZVC5gg5t2rp+92pU5qQ6E6uFK6e9y8fEgAAh+QQJAwD/ACwAAAAAPAA4AAAI7gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh36cZkCATiN+VtaIVrNaCSWLo1yg+YHqVJT0MyxtJhUEg1mNli6ACuImcqWqiEmFQNNN/7AOZNagyYDfywqSDVCM4o/B0ak6qCJzZ8HcUtbWKNJxB+MfyJUVJU549MFfxpsxnnHBxgSADR9xOhFuheuFh3MeULgkkeTQaVJOxIyulejPktUQmgFKnbsMI1iD7rE5OS5Lnx8xw6mvNegJncmBgQAIfkECQMA/wAsAAAAADwAOAAACOUA/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59Agwod6nEDBgnNltmE0MOfUyVAai5zSpXYB5oiqFLdJmzmGKfYtKqY2c0pEAZUU8xMZvYbVRk03firk42qBZpoWQR4SzOKvzkKqHqjGfYBM7kkhtAk4s/DPzhAKMyE4O6HPwk2V9DptQmJBpoZuvQa3QsFNixcYJK7lIn0aEctTPQq1Y4lBHSgXLum5dqEmJRcSPHR7doMcSdYKgYEACH5BAkDAP8ALAAAAAA8ADgAAAjoAP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKNamsBBWc4oT4I+Zgg80W/qL62+aCZjepUiVYxSpVwcxjUbcxkOqBJjF/GEBIVaJsplIWDbDCmTl2zT8DUtXMhFrhn4W8M7H5I/LPg9Qcgf1Z+BcoajFhM4n4w/YvWQgdVWN6KXPBXwubOyz1AvbIAE0snHqp7oVCiUwfgFavduRvyQyXHZKgkS0bxZ8urXis5HKGN29dqwdNaHcxIAAh+QQJAwD/ACwAAAAAPAA4AAAI9gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDsjym4kOymxta+PNnYASEmmuWSpVwg6YBqVIrzLyBFasImVz9wbgq1QHYpS+sYD3wFGaypSBydJ0mcykNCAewhqjrz9g/C1hxyJTmj8W/B4FlCvG35p8OrApkMvD37R+EGku3WZPpzJ+HgQI4CIvpZcIFfxpqdpDypxewR9toVqLTq3YvFNRk+phg27Yjfz5muOyQBE3v3ij+4DmVZ+WKQnyO99Zl21yMcxcDAgAh+QQJAwD/ACwAAAAAPAA4AAAI9gD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0BlNviwAScQEv6IVShR85gBf1D9KXlBU0fUqyBmcrsaVQgzmd6gEuG6QGYKf8+UPY2KTeYDf20xcI0W822Pfyq4iqjrz8K/aFyBxKwAV+A2rDE9FP63NaqOwf6cCVT2bdgwGTf4tiAY5NjMtwxuzkhywZ8Qm6ro9JKFZBjNDCZ6ye6Fy5+ymOQuZZot25E/fTNcQkAHijdvFH/OoGOy8hwpPsZ565qNxsmb4BUDAgAh+QQJAwD/ACwAAAAAPAA4AAAI+wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPnzapZNHB4WYDBv6SFrASjeaapFD9GcghE4KQqFCFCIjJAWtUGTE/JMVGxKsCmCqShrhRAKsHmFmSLvtHBiuJGy9BJMUrDGlUES9pJFUm0BhWcC9fJBUmkIoBqMM+vAyUlKCAbxauAX45pTLOzv6Sfd472h9em2kuJHVREx4nPsAS+GswkxygRr1y45ods8OOP7mDO/Jnr8NLVWeCK++F4o+lT0tWIjARbLlyXcHRdKlkvGJAACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+cObQxKCDDiAphM5U988e0KYASMqs1nervwIeYNahOFbIMpjOtU7dAeLn0gIgUYKu5hMD0gcA5WgG4ZMaUhsBjLbRSaEmBaZaBarSKaJmDqQKCWZvCONbyCdOrBKs5eJAFaUsFTJHh1JEZp1R/OXCCYAr1ZgDSOF+gtsku1OqZTGI0MpTAX+mYNi7t6sU7jO2YEFbQ4U1cl79ENl7C60K8eS9GjQRdQrByCaBGzpvrIo4G0QoeFgMCACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp4hrDJRI22Zk2cwF/pIq9UfCGASYFEgsnVoh2ctAU7M6eHkta9YRLgEklTBFiNcD3Voy8GfAqoACXrm1VOJvq8AGBrLKYHksaSCCQw4sJaaDZYOk4Ap+EDuMyJOWJZJmObjhxsscSRXg/JAZp4LON7MkRYZTtD/SN8GNxgli9c06rmsiCBV7pjs0aBKcprkDVK/fvnbHbMfpt3Fd/uR0eLnEifHnvVA0+uNJ1MoOScxBf66Lz280eNjkA7EYEAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6vxH4AMOGuAo0LS2Rom/o0ehlZMpA6lTf8SaJXup4qlVGQRcnrBqtQKElj24WqXR8pnYpwdcrISA9NsQHVvEhlhJ5WiBqf+EGbFqINpKCkenFBwhDek2OCxzHNVhUFkJESW+svxw9AlOBUeX3tRxtAROIJ1xggh9c7Q/zzdpkLb5YnXN1qdxcnNNcwptma4u3H7JZEIjQwn8jZk549KuXsjD+EMWE8IKOsij6/InSczLDF2ia+/FqFYjJ2JmqA8cd6TRdu1QtJ/ZkUfyxIAAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmTZgCQuj4koymsBHb/An1d+AEhZjJYAxd6o/ElJ4ujTGd2sOFy2JTp2K7wZJK1qwOWJb4mlXAyg9kmbohsFLF0HRBGtQxMNUYSzJCoRHcUEHoswciWoIQqsNgECowXwg1e3OBUGE3/00RGlmyv2GVjfgTUhnD5c6UI3v2B/nmaK6mhaK2OXqDaKENXvtjzFpoiZtpftiumcFEJmAJ/JWbmecIml7Iq/hDFrPDjj/Iozvyl6jSyzhnomvvxahWpi5cZqgPRGAi2HbtULQXQkcOQsWAACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnKmxBAYZW6ClIHNDJoEUw/wJHepmjoCXyWQMXTpUCTdhLY0xnSrUQ7KV1qRRpTplpZqtVGWszAZ26omVJ8ou1dBg5YOpQpYecKCgZVqh2MRdFbbsiYCrLjEIjXKM5sA5QnUYHvhWCeDFDvxFWTzQgz8ilAVaxpyZyOXM/zxzpuzZAmjP2E77a6GagWohqg+AtuxvtlBlmWn3pEy7reEZny4IPUqz0hk+wJD4KzFTlIle0HtVWR4zj7tg0aG38ZdI1csdoLJnFmeEpxcnVh1UYunCR3x2XdkFfRpnMSAAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKlS5HHILw82ICFBSX+/BmQ8ULAzH9ZpOUcOnQYkS8udQwjyjTnsDnJVm4Q0rSqPxYruVmtCmClha1Mh+FYiRNsTiVjVR4zm9MCHJYQwB7QpkNmS6pDt42AQ8XuTGxDof4s6CEnNmGDC57IqSNxwTn+SChzTPCBvyiUCTrwRyTzwMKdPf8DLfofEc6lT29J7Q8b6wKsW7AWMpu1v9KF/SH2nPuG6NwbfudsINxficw8AF3IeTyxjVW7egFDYjxxuzO9svfC5W/MzyWAtGsjd+TvXiuXHT6ZEy+eEapeqNh0UBmHDh/24nWJB5XKh1+JAQEAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcyVLgBh3GMKxhEeCJspYERcAY5q+nT38HHsDBGYjnz6M9WbDEgbRpzzEqo0lzinTY0JQjqCKdslKC1p9zIKyM8rXnGrErW3w1QAYngKbSZJzAcQznvwpHZYhAa1dgtp/G+hpU4LOGYIPdehJrcNhgTw2NHftTGnngjZ4jKlvuCUKzwMv+Onve0DOA53/Rer44DTqwZ9CUNR/rieH0v54PbPesoNufDNtTe9gW4g/AcH8tbDPwR822WiXOe9p+68+a5g59aPW8UTlNoV6btjczbsepl/lejPwx7sukz/nzuvyZ4oITgpRd798zQpSpC5cOKolxBh/5vQfFe4VIcQdfEgUEACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTIHPQqCFjiwUYc0Z0Q3lQGY0W/nLq1OlGBE2CcArsHKqTyE+BzBgQXbrm6D9vS4keEHCUipuoQ8E5DYF1pwOn/6Z0zdmDANgTY7dQAfsPLdYax9j+YxF1mzi5AsEtTWEW7z84Q0ng8Dsw2dWcw7IQJghDp5HFBI3kLJAM8sA6OUdYHvgi57LNAjv7Uwb6n+i4oGnkjFYaRE6qoF37K9E6Z7nSWXIqKM3VH5DSCjKXfpLTWGnA/ryVLpFzTukGOSuUppITRmllOS2U/jd5uzR/1LYLS/HnZvuznKDDmaCVs/JiHusG9dqU88ZiVZZ66e/FyJ8LvwjEsN9+uviTCA9sdZAKGgMOiII5u3giylErFMJHgwNCsV8jnLCBYEUBAQAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihwpEA6NOdqwafiGjGRDF1aK+ZtJ09+BBi4TCgt0oKZPf09yHqQC46dPIcmEGpRh1OccpQVFNPVZDirBB1NpbrFKcFvWmQq4DuyZtYLYgQaybnNxVqCFqRo2tBWYoumcpHP/Sf1pJO9AYc98nvBLEEPNLcoID+RAkxgcxQSxzawBmeCJmR8qDzRMAq9mw8U0b/bXQrTAZv6omf43xZ+S1a39WTO9YCZO0TRmPhYNYqYI01lmZjGtYOYI009mWjE9ZmYK0wJmOjBNZSY008JmbjXds8BqBjZXF1aYKcy0ZH/MTL/1J8A0kZklNPNo8mNmVcinCvUChsRfS8LxcNLLgL1U4Z9fSxzBB4EDtuGPJB20BcEO5jDIIAqCFPLJOFy5goqFFupCYCMmVAIBBBUFBAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzo0JqOORoeQOCIsYE3If5S+lNAsiIBFm5UqvzWcmK5AjJlShtZ82EAEjlzwunpcEHQoNWIMuRA7GhOGkoXnnCaM1tUhS2oygxwFaEwrTI/dD2oDGxKasLGHjxglpvagz3A9lD21mAzrT2C1DX4gaqEY3sNQmBw1EGywAfTBf3GE3HBBk1Vyjjs+KAHlS2oVEZYTaWKzQiRpcQGOnTKBaUPckj5OXXBEinFuX6dUsdsggJScr0tkNlp3gLL+jMCXKASf3OK/yMMTTkAfwCUw/D3TPm1lJR5T/UnoDiLlF+K02tIqaY4jpTgiitIaax4jpQYilNI6aB4kJQwlKd0phylAeWEkQCcDZfQkpI1t7VSSC+bPOJPNK6BgUgvFPbCiD8NlObFJXxUSKEu/uBjQ2UzsLGLhx4yIggnnXQQ2DmIdIhihVBUiEYMYlwUEAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFid1oWLvIEaEyFkr8sehIcuCTbf5SEkNWkiOEdMNSyoySrGVFZRVk6vRXx+ZEAjJ26mQgzGfEOUJ3qjH6EFnSnWuYOmTxVCc2qQ2vVZX5DCvDoFv9GfC6UEJYf1vIKnxw1pjahAvCCmH2FuGHsFnqIhRGrSoGvQlTPK0AATDCIUllKDOcEMDOHgQYJzSmM4oLyQnFyZRGAXNCpykDeP6cskXR0Qc5pByJ+mCJlDpau06pQrbBBilx2C7oImXP3QMJpOQGnCAJf3+LCzTgz4FygVH8aXj+T4O/AtRzuqGO1N+N50ZSLnR7Htffh+cgYD8PkXLE87v+rDxX7e/E8w0prz0X7q8H9ePbUCeEP10914I/xChHjhO0pHQMcEkM0ssmKW1gmyuo9KJhL4z400BrCEyw4Ya6+LMPFp51sA4aI47IiBONmOBKB4apUggfLY4IxYhnrMLDDBUFBAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsOE/HAZAOJxIUeENB/78kchRsWPHZc4yZrQAwaNJhjmeiRQJ5KTLgzmErBQJ4KVNgQ0MzFwJ56ZLYVt2rmTh8+QLoSu3FPV4TCbSjCSELa2I4+lKAVMpPrAqsmdWhxa4ZhTx1eEBsf7Ill14DK0/jmsVdnOLNW7CDWgZ2FWobJjYKXsVbuPK4EbghGu46jiccIhVwIwT9kA6J7LCakIdlLSMkICSmR6ScVYYVGQPAqMVShAppG5qhB5Yvla41R+AzbMPnsj4IndCIxmR+UZoLGO34QcDGEduUEfGEswLihgbneCYjDiqD4yWcYF2gRCI+YRL8V2gTg/l/4WNkn61m/RzMm4oPyXjkPJ1Mi7+7twfjfIfZGREeRRk5EB5N2TUQ3ri6VWeTsRI9V0B8mlnQxm0PFcdG4X0sskj/nzAHBiI9GJiL4z4o8BwTJTBx4km6uKPJjvMBoEUoMAIIyOR9GLJJ3lwdg4pL+p4IhQwmuNJBrh1FBAAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyLAhBRjYGjScSLGhAiH+/MGoyLHjwEDEMmYM4LEkQwhzRIqUxsyky4MnVKrM9rKmQGMyVTKAYNPlk5A5RT7pWVIYtqAquRH1CA6pSglLO25xKtJA1IrMhlEVmezqxHJbRbrw2pBM2IzdyDIccdbfDbULX5xVAnch27Aa6irMcpakXoTTwjJQ9hchhAJUh4krnFCuU2OMEx4zgLRGZIU0glboehlhEBIyexDorFCDygJjSSd8IJLYF9UKMYicAlsht4wH3tZGWCfjg90Jq2UEARyhgowqih8cklGNcoMUMuJ4XpBZRsjUCYI+kZ1gMX9QuwuP7OEPgHiBFfwdOP8vRcaW4nH6g3O+qb8Q51VkpHE+R0Zv5zWQkQPnJZNRD+xhxAB72/hDjDDnkedPWuJpk1EO512TkQLd8QDIBRlVQ90MO+zSCzBI+FPHc2+c0cuLvVThzwvFLQEIHzC+2IY/mABCDmwdSGFOjjmiIEsvf8SwRGeV0IEjkTA6QmQpqnRgUkAAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMDIUBAyLChw4cHG8AQcgKixYsQORTzx3EExo8gBYqQxpGjGwEhUz5UoaRkSQcqYx4sd8BlSWIlZOr8F42BTZcYdsr08NOlgYVCQ6ooajNH0pBbmLr0+BTjNKku11TFCAJrSQlbLxrxylFDWIvfyPrDdhYiUbJE2j6UoPaaXIdpydK423CsVxIN+DIMQTaFYIY3akptQeUwQ29SlcBxzDCakKLDyFBuaKzoi80NmZGwOQe0Qw0uiSQz3fBESWmBWTPEUHKvbIbcOAohcJthHY6leyOsxhGccIQKOKo4fnAIRzXMDVLgiCN6QWYcjVkvOLri9oEbwX6OF9jDH4DxAiv4O4D+XwqOzNB39jd5PDiOIdAv9Wf7ew6O3qDXAEcwjZcMRz20dxkD7W3jDzHCoFeeP92gpw1HTo13DUcKfAdBEj9wVM12XJzBBzBI+FNHdKKY0MuLvVThz2fCedFEMDC+2IY/oZgghmwQdCJIjjnigmMvXYgxw2Zi4EEkkW3kyAciqsQUEAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwNvJEPIsKHDhwaTPYjibBnEixgfEpDgryMAAhlDivx3DEbHk1NGqnyYTMbJkyQErJx5sMbLlylo6hSI4+ZLN8d2zhQgzedLIEJXfjP6skLSkRSIMT0p5KlIblNfyrSKUUPWkx+4YjTwtaMOsRdJlPUHAu3DY2vZunVIJW6IuQ0hxN2KFyGDslv6NqxQ9qxghOC+yjjM8BhZpgYaMGYYgCmJsJMRCgNgtG1mhjp85vzMUJmblxoWkmbY46Qbi6sZXju5IHbDNR0P3LDNMFvHb7wpdxwRHGGIjneLG3yCXLlBCh0DOC94oyOL6QUP+HOAneA2f4G7C4d0+Uy8wAcdg4pn0bGE+TodFZgP7U+6+A/WzS/7bb6uPw3m/aOEPwUEWIw/SgRoQUcumEdERxyY50FHIpjnQEdkiMfGD9Fh1w4ifBiSgD+1KRfOBJn0omIY/mjBRXA2fLKLijS24U8kfJTSTmyVkELjj7348qMJYmTmgxPBAPljkkA6gcVKAQEAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyHAhBxrKaDScSLHhFyFCvPkjU7GjR4FwhPgb6U/Iho8oGQowQJLknJQwDxLA1pIkCQExcwpcU7OlN50xPwzrSfKZMKAoIdAkSvID0o8qmLY09tRjBakkK1StKMwN1pHFtlIs8XUkMQhiGz4pO/JGWoYK2Ppr8HZhCLnM6ir8wNaAXoUc2L78izCZ16/lCCfU9lWrYoQ6sD47+figUqbD1FRO+GRoT26bFX7rKQFtaIQ5arbIezohS5IiWiuUQfKbbNFmKdxOyGIkjN0JA4wEDfxgVH84ih8cM7KacoNURr54bvCAvxTUC0bx9zv7QAn+/HqOF3hiZJDx/xaMHIK+2kgd6Pn6C4R+2cg16KP7k4H+nxJ/2/THgD9u9LdFW+iB58806DkwklPj1TASR+NhMFId6BkxElXevVHLSM1kF04MmZiTgD8YPNdBE+b04qIvwxByCnAQsFKIizg64k8/vZwxY2tgcILjkL34MqQlnZim2BKABEPkkE4SWUgaHaAUEAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIMOEGbwJz6GhIseJCF9v8ifsn48A0iyBDQpDhz1+FEiVlhFxJkUZJf0pSvBTBsiZCCkpe+iP2EobNnwQr6BzqrwTQn8iIDjVy1KZQpS9bNGXZgCfUl2OmhqxzVecIrSBJdi35DazFA2NLbjNLcUPaksSEsWWI8q0/AXMX1n37JK9CAXb99fWL8JhdYlQIJ8yYVqVihDLTbnx8cMywsdcoJzzRtUVizQcJ9IAqxChohC4YECWm4rRCEURpuF4IQKeD2QsxvHzmArdClyUX+FaoouSwbsMT1o2SPGEyno6bHyzgL7r0gh78Fbh+0Ju/Yce4F5wEnkM8QR0lcZgfOKQk0/X/upWsAP8fhJwW6v8r5k+I/i0l3VCfNiWZtt4DJX1QXzMlTQSfFSV9Bd8LJVlRH1f+rFEfCCU9UB8OJWUGXzUleQBfBqGU5JN4PPRhTiOM+KOBeJ8I0suNRfijiB48NOcKJzcG6Yg/e/QySBlM4OZDKXwE6WQRTjZSRjigeXEJGk5mGUyWvZjjzjgsBQQAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyPCgsIYQI0r8R+NaMoOBsk3c2FCZAX81CCr75q8Hx5MJgfhbGUBgMhkrD6CcWRDGSn8Huv1bc9NfA5o0lw3r6U1ET38fgM40dtSAzZ7VlKIEcLSqvwVSOQqwWnVN1o0guB718HUiSbE3t5SVuA3tzWJrIQZxe9NN3IZD6N48dndhCL0rKfRVqBJwjsEJcQD2xwExQh2A3Vx0bPAL4G+UDxJQQpfYmMwHT9BlAfoglbZit0wuXTAaNK7FfrI+CGFO1QOHZyO88bFnFt0Kbd88AVxhoJsMbhRP+HfliOUJOawkRgU6QgJDsVlPWMyftu0IYcKjAH8Qg78W5A2+WKk8/cAsK5G5H4hsJYj5AhusxID/nzAS/pDVHwP+RNHfPxb4Y1d/MPmzQX9n5TafNysp0B83K+HQ33r+vNAfDSsZ0V9Y/szRn2L+YIZfNSsJ6B4Toawkw3xS/NELI/4QkR4rhfTi4xX+KAJIONaJ4oSPSDrizx69oOGJD8CRMwGSVPZSBJXBeDJOaRDsYGOVSAYDJhplQMlRQAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzI0CCEhhAjSvyn4cPEixgHfvD3bEPCZOIyiiT4wJ+/CgjLbSOmbKTIGwdM+gtZMAAJk8tcZgQn058FghDm9LSo86KMnv5UCIRQsqeOohNv3OwpQSALpP5wQJUYAiuxaAqw+guwNaJQrOAKiH1RFqIBsQDE+uPWlqEAuXin1F3YFa9YvXsTZvMr1kjghGcJ98RwGKEHxUgZNzZ4FLJMw5MLOrAsU2tmggs4+1MS7TPBZcQ4rzFdcIplBsxYA62hWAlR2QMhGPE7zDPugrvlsv1tUFgPsZKJGxSBtcJD5Q6L9QRgDTrCazJJjLGO0JjME9wRqqyRWSL8QQomC5g/CEGaP2jrD2rw5yG+QaE/7RMMNFqY/oE6mFTef//AYRIZBP5DhUksJPiPG/444KBa+RF4nBAOVmASFQmeYBIcCbo2U4KhZZXgCyYN9x8IJmH2Hw4mzZEgECZ9Q2AHmJhUn37s0NELI/7IYF88XfRi5C/DUDLBEuGFU4aRUOryyB69NAKIOsrZkAQaUHZZRJe9AOIDblxYAmaXwZwZjCcIZBQQACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHEAniGBGxokWCPfzRuMjxYbdh/vyBgAihI0QgIf0RE9FwAwZsJh+eSOnPgICFOIT4ExLToQWa/rYkQ+jCQ8phPRkmIwHUH4uD5RgATbqwRFN/w54UBKIE6AGqCtVc9RdlqEAaV5+BTRhgrEaBdcZuW4uQm1sDyhSAvKqB7kEMbv3hkDrWgV+DM90SHvv0MMEHgSOPdDzQSOTALCkLVHHZLTPNApXp7Ay0GOiBU0gDvXZa4DFnqlPqaC2QwuLO2ITRFthgC+kDHHYPVAY5shIFwglCMOr2ePKCGw6MPZD5OcHEQIUMsW4wRFMhcLgbwYzmNYf4g7BTVjt/ELsE9gfBpdQKvyCHkAbqG4QgXYZ+gxr4U8F/BaXgT18EDgSCPweUlOA/X4Q0zYP/HEOMP0BQ+E8B/jSjoQT+aKMhYC1oiBYxylCoQ0glUPhESMg9uExIOFBInj/GUHhDSClQCEFIrFEY0nsP7ugPEQmOM0EMIcGkHw+X7NKLOUj4w0sp6sCHDii9dNmLL/7s0UsmMWRgHQ+d/JGJl11CgQubvUyQ5W4r4AGnl3y0cWcmgIhyUUAAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcWNDFmjnccHSjyLFhA38g/Q3roaajyYPJQqpkAZGKiBEs1jyodrKgAZUhAzGEgAMGMZzeahJ0hhMksScKBfQoCjKd0IEamPrbpgxhCQZS/dV5KtBD1hcHBRTL6k8F139zslILUvAYUbIlzk4ha6XgA7L+DkA4G4CsgaoCyeD1p+HsPxF4af6jchPvFMMfycoQiGGwPxGG/wkhS6wbBRKDDwA+CwMvjjWWHWT+ZwzvNzeWQ6wW8DOrEssGkq3+d8Ky493/bljwLdVNNOD/XEQljvMx8n/CsoFm7m/L6OdjohBXwkL3c4JUsFnjvkbh+0EKt7Ni+2A+YVqmB2gIa58wBNMoceknjFbUwzH9C70FkgzeAZhQbyAZwIyBC4ETEggMLsQBSEr8F2FCEBxQ3YULReUBhwql4E8PICYEQl57lWjQFyDlpyJBx/yk2IsEFeBPUDQSJIE/k+U4UGXF+DgQDSIRIOQ/OoDEwZFPgKTAkcuABM6R/PljzJE3gLTGkRCAVMGR/4CkDZYgEeEjD5/0ARI2OZ6CSi+DIOEPLyaIUWIldPSiZy9V+LOHnqVgwWAHXNDRyJ56xoILonxMEI9+rjiBKKNtTKrnERlQFBAAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLHiRAg6vDmA5iAFDTgWQxqE8MyfyZP+tpQTyfKfA5QoidFoGRIETJgvLCZzIaABgYrTbqIcpuOhsBx1TvQwANNYRaZCTR6gwDBaM2pRTQaoeC2rSRkLxUH1upLiCK8mQyQMMAytvwPCKpZwuw3CwTpt3VYIycCt2oJq8roFEnKN2x4FBQhxa9LNjZAfGOcgKIOxyTkiIfRF621gNcsmh7A04tZAXGXFQMNoSYGY2yf/6oD2J46mN7fpIBRQTfMfgR5oNYgATQxk72Mvs7oxbHlNb4IiYAiGecBygWPPCy5Lt3m21MnZDSbwq+PGuxAF4ROKcM3YgBUq6RUm99qDTLL4C3VkHeZBNP6qUcFg3H8NOQOTGyAQCNEJKAnhn4IOgXOSEg9C2BAHJ7FgIUQQVEdMNBtCpIE/FoQIUQr+aGPiQzYBsKJDX/jjRlwvLnSMa2PUyNBu4Oi4kAT+OOdjQhj4Q8SQCdHgjwFIIqSfP/A1WdATJpUl5UDLpHUlQdGYVMeWA91gkoZg/gOBSQ+UKZBJHqgpppFg8vBJHyZtseUpqPQyCBL+8GKCK0hWQkcvhPZShT+QEOrEOS92wAUdjRRKaCy4SNpLKYxu+IYTlhbKRxudXooFRQEBACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGA8KqMaiQo8oBXrUUCMso0UCPfypXMlymziTFbmxnKlyGDeYE48ZoEnTG06JxnjSpDFRGRwg2ebI2FKgRQELHnQ03EBCKEsSORze0IEBGzGrKus49AB2JbaSCq2xOFCW5RiHIdqqBKGQQhS5K6M8TPZM7rMgCBsUw7syEEQMeBccFJaSsD83zCDCwcsgmcE6jlWukagBL5CCN/o6JkFBog68GgoGzbxZIoS7bYcJGJiMQWYh0SjGlWts4G7HASw6kKtXYIXMGiBYvNG47LJ/VJQ4ljb74rFrbYmCczxMqklxEqoK/5XxD4bjmz+PfaAxx8LXlUqWvZfr86fBGzhsq5SB141h+4HpJ5cBzXQDoELVtCVEDQqgdWBC0VhFQgUqWPZgQ87Q5IYRG1wI0QkzVdChhxBtt5IRJErEwUoVpOgaW/6U4CJn/jgzo0Qp+CPBjRGBoCOPEH3hTwFAPnQMMcNQUaRDBfgjwpINSeBPb1AuhJgDVS5Egz8AZKnQaSQ46GVBT6j03JgGLaPSS2gWFKE/4LQJmkpUyikQBCqdYCdBKrW45z837LcnD5/ooVIPdp6CSi+DIOEPJahUMmYldPRiaS9V+AOJpZyIsWQHXNDRyKWWxoILqb044emNbziB6qV8tAjxai+lYEFRQAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzaoTYgIwRDz22MXAmw1iDjROF4djir6XLl9LAoYwo46VNm3OEzXQI7qbPltcg7Gyo4adPb0MZqjDqU8VDFwpeeHMATcYWaBK+NaOhAw6BhRBaMLXJ4BjDEDCIjXVJYgsLOAmtrH3JTWE0aHN9bkkoQG1eITcQuoiS16cahRIK+xtxEEJNxS+JLBSh2MLBnpBdEoO7sGhhCgWVMcjs0kjDcsMK0ygIhHTLbV8bpigsoyAM10o4NyTgea2bZAMbpCa9GuINvHORDQTh+ttECHUOrC3+zwNpC7EnUnlB2Og1gcKkZf/etiHjshEODNxkIHBIZgagZ5Z4wdIl6ECQWyxLKlDEaH8yPZaXBt3wN1AJSvhzzTFu5PWMFToZONAc/igxwlgkWOBNCMBJSBAZLSV4UwsPBJCDMh4i1IBPBVhRQooNOfOSEDhECCNDs7VkwIs3OqSDSzr0+NAGLTEglJAOFeCPBEg+9I0/0DTpUB3+FCBlQx/4MwwVVy50Q0sidLmQWMaIiZg/DpiZkDf+AKAmQlSSYOObA6nR0n50EpRDS+LkSRAFLcnkp0BBtFTmoP986c8JiP4DQUsVNKpobX7y8IkeLfXgZyeo9DIIEv5QQkocalZCRy+o9lKFP5CgyskrUnYfwAUdjaSKaiy48GFrF6oI+YYTttrKRxvBomoCFxQFBAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyAlLgtRJ9uUQDhyCAv5UEQNav5iyowpBEMDlgqRYZvJc6YSFspwGgRCoqdRmQAoCCWo5KhTfwZKRLyhYIoDC8WoKaHGAJsEDODGQDC45qnTYt0aQgghg5hZmc/miCAIAcZbozIYwulx1yg2cQMbSOvLE4jCEE0J9/RAkIZimcWSIXyS+LFMaTcHCoti2R+Og9YKdJ4JwuCHzj0OOh4dU8ZYgw46LzNYjDXUDQgbCLFMo+AX20o+KMRhOW9j2+AYxlbsJujAa6ynNLwB4HE5grU7Y3jYzYLiOgOVDf/rvOa1Q2XGYN79NrBEZ+kTlYlYMMeBBAff1qyZIyPxtoFqPOZGNSFRUUFMVAj0gmJbcIDTMQb4o4JAc/TVAjjmsdSMP94IJJpTxESxhgIrLfXPEP4wkAwyMhEDwDXeLICDCNM4ZyJBLfjzwhb+bFPNDTc2xIJMWwAZZENwyCTckQ7lOEyJTDJU4QFROkRGTMdUyVADMSGjJUPO+APelwpVyB6ZCS34H5oIKeAPMQSweRAFMTkoZ0EQNKXDnQYx4M8CfBbkXQqBEkSEPxUUOtChWygq0KEtOPrPTgYoysMnVwxDZaCdoNKLGUj44wUpO7BZCR29pNpLFW44kSoecVQg2QEXhTSiaqqxoBDMrV2scOQbrt6qKh/ACJtqF1xQFBAAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4pkaE0cNwdEtsiYA+7GyIYiHCjxR7MmTSHGjr1EmEODzZ82CzzZWTAQCaBIaRKrRlRguqRQ/Q3DAXGDGmMnPECDJuFBMxoKBCQsETWqkqELhVXTMKysPwMOyLgsaMxt0m3KFJbAZvenEg8hIBA00hdotoRjhBRGuk3cQGE+F9+kcvBYAclIFxAUIA2zvzoHuXn+iS1ZQRyeoxhUpng0TTclDnrwHJtgCNc1qR7cwADzi4IncPszovADMckSCkbB/U2wwrqLDwgbqOz4aAmmF0JId7RwjoEcXFf/yN6wxJzOdkcMvO35AfmHyeAAoWHsBQ1w1XSAY9GC5reB0C02jBUgKSOBPwUM9I1kBiggUjdHUSDQZX0N80A3L80WwD/LFCYDWi9l4Y8G/wQIlDTF9FBDAGI1RcAB/tDQWQvcqFBCA0EE0VRCC/qX144N6fDaXEAydMNRWxT5EAz+EKGkQwsg+GRDT0hF5JQIKTOTCFgutIU/gXSpUHDXiJlQHVKaeZAC/hDzo5oEkeVPbXAOFA1NKtRJEAQ0gaAnQTMR+KdAip0wqEDHlTmoMDQlpycPn3hCk5N1dkJKL4Mg4U8upKxiZhx09CJqL2H404+oZ7TiHJAdcFFII6OKGhoLLsHEekYaq+70hhOxxspHG72KikcrFAUEACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKfJgshwocCqiMhOgiAAwl/mL6I1YBzsqFDTC4kckz5rA5N24ahPDiQM+jMVuUEDowmgykUP094xBRWAM4H3KUiPawm7OoUYs1aNhtgYadPd1YmBNgKcJkFsCClbFQGQuYcmMyWCMCQkEBBvJGrZbwRg/BR1ssYEaQQgHEiZMhhAYZ6QEWxwY2KFaZJ2GDODpDndM4sGgNQx+L7iltLMEPxEQPE1Dww+qew0IcDLB6REEjt3mmS3hCtIeCW4LHXKMwGZHO0vwKFEZC+QnpCV0crmxT4DTl3hxC/wARBSmJYtiw4fUXYKCa28TaR6SgBhw4HU8ECBtozdgwfzUMtMBqDHwAEgv+bDPQA6JJ0E1ILlRH2z9fQWYADit54A8I/wgAmTQsBLVSFv6gNiBYbkRxTQAi3kSAUTRIQ4w3OWQ2kDJBMHXQNzJhqKNDOsRkAHY/LnRDdXQV6RAM/hChpEMDtvBkQ0/E1OKUCCkDkwhYLpRcIF0qVNw1YSZUhz8FlImQAjMpo6ZBJcTk1ptNxaQCnQRBEBOHeA4EkxV9DiSEPycEKlBsZAYqTEwS9OlFE4DE5CSdq9DRizlI+JMLKauUyUohvYTaSxj+2BIqKqo82UEcljQiaqixoBYQzKuIrPAjOya8+iofbegaaheVUBQQACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIDMqgxCy4rQFMKj584ftxY2SD0XIGLay5koDQGAuLCHDps+a3wjoPEhDyc+j/mC8HCpQmQOkUD2QbLgBiJFv2iQ8MALuibWGyTxAHbuAYQkHxKCS2DKl3NSDc8aOVbJMITg3cm0ymFLC4LK0eZE6SFiNZmCf0MQVVCHt8M9hfQ0KOOD4aI8PBEtsq2zTyMEanJFOIUhFQ2h/Bt4KZGb0tM1hTwreIHIaM0Ecrn1yO3gDW+jRBL/lrlkjoQADnHsULDDc3zfVBnMIqUxCqMBjzZtBPyjAgeHAsQXC/8ntBhxECjQe9MC2BYaHb2u8fStWk8ZAHa6xRd4IYQTNwQJZEdow3igDEgv+FDPQU5VpMERJLpDgT13/MHcYAznpJFYA/yxzmAUjWKdTFv5o8I8xKymxxTVzrOHiFNmMIM4GTA1EAGU0SHMACCLWuJBwK4Xg40P4+cPAdkMidIOEMiT5EAz+EOGkQwv408KUDT2x0lJYJqSMUSJ0udAW/gQipkIn+HPNmQnV4U8BbCKkgD/EGBhnQSWstN+dAkWzkgp8EgTBSiAESpBRVhg60HQnKCpQWmsqKsxKEhiaRxkTrCQln59Y0os5SPjDDykrsMmGp72kGoY/tqSKhypT8iCwgiDBpGprLChkYmsviJTqYyVd7LorH20Im2oXlVAUEAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaNHjsm6WftoEYKKGi38+RtmAUQykhCPvSimsmbNbeVgNtTBwKZPlSTq6EwYxMHPoyoDDTVIIQrSp2QaKhPxAoMDBye80VBD4SGFnk+RCummMIg3IWGFSKBRQqE1Z2HDzkkIB2zcmgW4dTWog9hdpMT2FhSA9q9PYh4+GBxDxPBPbwe1OUYqYVlBCMaGTVbJwOCXzUgPcDBIA7Q/OAUxmP5JBMLBKaAXFNy22maxBgghNJ6sgSCV2jWftU1IePIB1wKRAffHYLjCECQmTxtIBjg2AQ5zaHCcZWCd2g6ORf984s1C4adTBsIG7QbExWQbBAiYlgPINc3+Kgw8AZqI4I4qKOHPNgNJMJkB4CBHEjf+EEOAQNgYpgQLVCwVTXRf/AOBNHcJgQFuSwnkgT9KlfATMQYAAMM3C4igTIgEZeGPBf+k448QawCRQzQKwngQAQeQeMAW0fj40DcqETOdkQ7poBI2TD50Q3QSRPkQDP7AYKVDC/jTwpYNPaHSDWAupIyAIpS50BYkqqkQf9e4mdB3BciJkAINvmhnQSb649yeAkWjkgqAEgSBSu4VOpCAVig6EFonOCqQX3E6KoxKVRYajicxqEQEoDasI0gv5iDhDz+krCBnJ6P24moY/tgm4ioeb2zJQyugZOLqrlCgEMyuvZhQq5FxIAIssHw4cqyrTohBUUAAIfkECQMA/wAsAAAAADwAOAAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyBGjAHDeHHiYM0JAR4rKcGzxx7KlPxIPpp2EqKOYy5ssSSyAMHPhsQc4g7J8wLPnQQIwhCo9YfTgHKVQgThsIALcgilGWExZAEIFBWELIawZBlXosxsKP8xhUNafEmwPyLhIqENJW5wLEMIhchcnMQ3Vkh0kQ7Yvy2JFCapxY1goACoHvTVm+aQgB7uTcUpASGDbZG4FZWTGKcQkQhGF+8IgyGE0Th0LgRoWQnCBa5feGHY70HjDQA+3WVZIrPBF4xwDPd+WocxhMmeGQwwUsvwYxBLU744YyHt0heYRc7D/bZtuoGsWxCEGMUKtLFOBmYXAvghhTAhw4Ea8MGKh5Wb4jXnQQFNAkOAPNub1BYA4TQ2UjT9u8KTMXVuQkZ5RVBi4zD8NKEVMD9xw0OBBwIHwzwcuFeBBMyCUY82ICWXhDxH/NOMPDCFEA6NDBPAWyAFG7BjRNyw9I5iQD+nAkgdIQnSDgd80CVFS2kj5kG0FWOnQEyyhpeVCytglwpcMrRQImQud4M81aCpUhz9ZtomQAv4QA56cBZXAUgl4GhQNSyr0WRAELJkoKEF2WXEoQdS9t+g/xKz56D/CsPSfoEwAEgNLNPbJgzu79IIGEv7wg0glcq4iSC+s9uKLP7awI2rCG1rycMofmbTKKhQo5NrqrE2qwomuuvLhCLGsOiEGRQEBACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEix4sRoyETkYGax48ENVrb5GzkSQLZoHjtCoHGApMuRB2hASDnxmIeXOEdWIEATIgEiOYP2cNHT4ZygSAEQLbqwwTekQnkyXWgEak4HDYU9WfBtSwFqBrZtqTCFTImZDJMVsIoTh8IGzQyw9WfgQTWUCmnMdfnsxkECLJTsdUnMQ4hkCBsMJjnFYANsi3MyWIbQQuRnyghaExn5pYUSCa101kGQReeX3oQpHNP5xMAGgk/7IxagIefBPQaalq1EgUNjkQ0MZMBb3MMg0hYTE1hCNgkVERdEFqjj9DAyEpP1GCxE4IjTLyh2/4uyl4HAOp0xWKTylG0UgeAiX0NrccicZ1C3CFSxWAbingI8EQIIgWDQwzAjySBQDoPJcMxUBsFBnIL/ULBXDVJBWBAZ/uj3TzRsCQGOhggJw8ABqi0DlRIYbEBiQlP4o8Y/1eREDAwgcPRiQhZuIcx2IxkggRUKULFjQ5Ztp8QU0xwZHUnGORlRc/60IOVExGFzpURHUbNlRPH508CXD7HmDwhkOiQMCf5glWZDAPhTwJsNXePPMH7RqVAzI42hZ14jzfgnQiCMVMegCHHoT2OIGsSfP641WpAII10jaUEKjATDpQRl6g8RnA4ExEhacrpEDBc84k+pjebRxyC9oDWRgD+zdFEJolKA0suuvfjijy27muDKm17sYA4fvO4KBQrBJFsKFl+ygkqy1DpC7a4TgEFRQAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsWLEGzhqbCkQRYIVDhZDErTGTZq/kyhPQhsi0mKJKCljniQ2BUJLiXCeydzpz0Gymw9vMODJUwIBoA4/bCO6s4JNpAyjDWUas5nDaDqmXNvirECBLTDmLFCzwSE4qjGHqVCoDJyGYWj9bZuj45hCAibjnmRwAyGIqXpRKvFQIqGDwCdZGIwmA3FMEjQUgnB8oO9AAS0cp3z2YSEFzSAGQtiiGeWzMQ0zI/YwkEzpk6cdYqA8EGbpAzkeKtDc4F+518PIQBQGWG/udK8XSKThGNm/xpq/TVS2NPCXf7YRYzs6MceBwIVVB/8WQsGiuO9xXfwDgJiYOJHLYKAlIVACYmNAkWHARoJnMYGz6XUCVAIJI8ATQBijDTEnYSNQAHo98BSBBcFhgD89CCQCWsRYMSGFBbkWhUBjULXNEyAmRBwJyvyTA1EFBPBTiglN4c9aZ8VUzAkifEjjQZ/1IEwPJwnhAAjL/PiQBf5o4I8Q4Myo5EMLoCTClBKVcNJ/WEo0lINdRjSHPwyEGVGOvZnpUIn+VKOmQ8L058CbDrFXAJ0NXePPMJbhmVAzJ6HmZ0LM+aPGoAlN5k8diCLkmj9TNHqQCicNKGlBG/pzzaUF7eYPDJwS5CkRoQpkwyINlpoBJ70w4g+Ykvo3EAMfvfQCiz+zmNAOojx8QmutvTiChC21OoEFnp38AeyyvgSzbCnxmAkGKctWa0a1tcYQ7UQBAQAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsWLEBuC8OZiTLgsziyALUnBAzJ/Jk8QcwAkJksyBkzBhnrjBciK4YTFzmiwwrSbEGwV0CjWw0qfDGzCE6hSSY+KxaUNE5CixASKzZ0pzGqDgcAMIB9twxjxgYQ64ngsXZM0Z5djCciTXwiyG4YMwhA3EyjV5ImGDa3t1aqOS0EJgk8OeHFSA9bBMCApZOPanwSCQkpNNzmGoIHPTgTowZ5YAeeEN0YExDDxmIPNOwg17TN420Jhrf0o+N7Q9maYwBrdpQJyWmcM/EbclSJQxGdm/dK4ZRJOITO9e5xUyE/tAMYVj40QyL/+omEzC4W7/mDsmbVGZd7nE7jpwzMAFyy81hGRlIHDK4QO6sQQBBSKQMYIxa2whFjYC4RCYEiIYlRAcwPUgEDJ7PaOYhAmR4U8UAlEgFwwCcKjQb0oo888YWRUARGkmJuSfCv84mNMBDqgAY4wJidiDMLKZxEAFNHxxF48OGaaBPyR4UxSSEallkg5QUlSCSQZUWRFwDGo50Rz+ZOmlROCY1MCYEbHoTzVoQiQMCf440CZEAPhTwJwPATYMTXgy1IxJY/TJEA0mqSHoQiCYVMehCnnozxSMJqQCX5EihJw/11S6mEkwaGpQZ/4Q4SlBNixiUpejgoFKL4z4g2ql6pQ00sussLhaSgaRepHKrLw6goQtvfBRSjx9QoCOObwm60smycaAK5rnvJPstGZMG+wEz0oUEAAh+QQJAwD/ACwAAAAAPAA4AAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgPUsHh7do1DDgaZMyojIUSfyhTDpMhYmTFDdhSypQJY5rLiDdiztzpz02Amw8h1CHGk6c3oA8XFOVZA4JEF+LqsFizBsOUAOIENExWbOnONQ8FvNji1Z+BayO0JjRWdmY6htMcEG0rs8cGhCXoqlSTMBm3k3pTCnmisGtgAy4ONugRWOaBIQtrNPZ3wmAJBpNRDgvBEMRkEiIHUjCQGaWRhnknZyNIpLQ/bMkcYm6MbWAI10o4PJyT+ZhAsqUXQLw9WfcY11uEQUw2OzCyf4FKKykhkcbkcv8clB4xUVmUxsv+wf/ILKFiiWeBb/yTMdnA3YrLdJY9IPBBY2IfMEII8c2ZEH9CPFNAAW6kFIVASgUmHFIECSMOaT0IpEJgGDB4kA7+ACBQam2dZqFBwjBwgHIcLiVENR8iNIU/4vxDhldKnNBNighR4E8PwrS2kxsy1DEjjQlZ4I8GKAnhgRF1qEGBU0AulKA/GCjTZESpCRHblBFhVhuWEfHGAJcRgYPSj2A2dJw/KJbZkDAk+OOAmg4B4E8BcDZ0jT/DqFenQs2gNMaeClnnD1+AIuSZP3UUitCL/kyh6EETUvaoQSKgdM2kBSmAEgyYEqSpP0R0KlAHmKC0JaaunNELI69hmoEJvcQzCstrMYhS6B2XxKqrI0j80EsmMWQA5wyfoKHrsWFkcuwE6oD5RiHHRmtGtL0EA4itEwUEACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGBVCCJKxI8EncwqQ8EeiwIkQyTxWjFbBn8uXLxmMEKYy4rIWMHO+3LKspsMbOHUKPaDAZ8MQB4QKJZHFKMMQSoUOIxORQDkcxpqtYWElgDgKEBzCiKpTiYiGN0BoU0JWGjRjyMIm1EFWpxABCpk1S1o3p4E10RAeY9t3J82DOIQULgtOoYzFL2kYhDAHck43RRUusOyP2jGCyRxwfklMBcMnowMQxDD65YuGytxwljGwBLHW/q499MCZRMp/olu34OgQxOhp/zaMHE2iHERmsi0j+2e8dSCJazhPr9Fam1yI3Z5Z/y7x7zFnBoEnhhgGmcq/sZaJPbGoQ3HfAwKDQ359ccOUbey95AY1y/njjEDZWOaBSso00EAQciUTgnhbCATVYhbc4FRBdAEgEAcYurBhQcIwcABNJRTmwGcjFjSFP+L8Q0ZdBYTQ4kEU+KOBMEQodYAHOhx2o0EW6OgSMQBUcIIx1eTw25AIbeZSDSJC+VCK/gihjJURMeAPNlxGVBkDYUIEjkvdlOnQGC5Vo2ZDwozkwJsNAeBPAXQydI0/w2iYZ0LNuDTGnwnR4JIahCJUXR2JHjSjP1M0apAKLp0gaUEiuKTbpQMp4BIMnHbqEhGh/sMDJi6BySkXhfTCyJeXgjfRRS+0/vLlBAgQGk4ftPbqyCM/9BLMBOq82cE6jfSqbBiZKAtIrlxWYomy1JpBbS+NHAGtRAEBACH5BAkDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNqlOgChIMoBlrA4FZio0Uq3tz4W8nS3zAHG0xKFGegpc2Vz77IfBiA2M2fB0TsZAjip1F/Sj4MTXhj21GjQuAsRSgMhJKnN4tRadhADQ0Wa9Y041ZHTQlhEItitVlB4TQWBbCS6OFNzQ2GwoqttanjYAMHPveyJCGjTgOFGASzLAChoAohin9ii5ZQReSVKgiqCXyZZQplCo+RuOxgIAEGnQfjaAjjMrWBC1KvlCa04YvOh4WhTi0kx0MBnAX7Fic7acRrl5H9Y5F6GBmJ064q9u0htTGKagVT+Eek8zWLRhSD/9Z2GduxiyHiYn0mcE7kZ9sxQniyYI4HaPiJ1FwZRSANxcZNJdAHNW0hEHF7kaCGgATp4A8AApWwlxC1MSiQbm4k84+EWGkQn4UDTeFPZkA8ZUEIIBpEgT89CNOdTULAYIVUKR5kgT8arFQABiCIIECNC8W20hRoAdkQh88UaWRDqGGz5EPuMfCkQ+Cs1M2UDI2xUjVYLiTMaKV1qRAA/hQgpkLIDXPXmQc1s9IYbB70nz8LxlmQWnXYWRAZQ+pJkGX+nODnQCKs9N2g/yiwEgyIJroSEYjyMMlKTvqpiiW9MOJPpXGKwUkvoP7izyyALHHmOEeAqqojj/zQSyOA+B8wZQfuBKPqrWHwoSofR5gKpCqC3CqsGcK+6omvEgUEACH5BAUDAP8ALAAAAAA8ADgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEix4sRoyETkYGax48ENVrb5GzkSQLZoHjtCoHGApMuRB2hASDnxmIeXOEdWIEATIgEiOYP2cNHT4ZygSAEQLbqwwTekQnkyXWgEak4HDYU9WfBtSwFqBrZtqTCFTImZDJMVsIoTh8IGzQyw9WfgQTWUCmnMdfnsxkECLJTsdUnMQ4hkCBsMJjnFYANsi3MyWIbQQuRnyghaExn5pYUSCa101kGQReeX3oQpHNP5xMAGgk/7IxagIefBPQaalq1EgUNjkQ0MZMBb3MMg0hYTE1hCNgkVERdEFqjj9DAyEpP1GCxE4IjTLyh2/4uyl4HAOp0xWKTylG0UgeAiX0NrccicZ1C3CFSxWAbingI8EQIIgWDQwzAjySBQDoPJcMxUBsFBnIL/ULBXDVJBWBAZ/uj3TzRsCQGOhggJw8ABqi0DlRIYbEBiQlP4o8Y/1eREDAwgcPRiQhZuIcx2IxkggRUKULFjQ5Ztp8QU0xwZHUnGORlRc/60IOVExGFzpURHUbNlRPH508CXD7HmDwhkOiQMCf5glWZDAPhTwJsNXePPMH7RqVAzI42hZ14jzfgnQiCMVMegCHHoT2OIGsSfP641WpAII10jaUEKjATDpQRl6g8RnArkxSQjackpG4L0wog/pjbKDim9xDP6iz+8NMHDoD5MEOuujjwCSS9/NJHHmzyUkcmuyPqCrDlN2PBlK6AgK+2x0oKyzrATBQQAOw==";

var watermark = require("../lib-watermark/dist/watermark/index.js");

// let newResult = new Image();
//const logo = "/static/images/heart-hollow-black.svg";
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // this.state = { apiResponse: "" };
    this.state = {
      imageWithWatermark: "",
      imageWithTextWatermark: "",
      imageInBmp: "",
      imageInGif: "",
      imageInTiff: "",
      imageWithTextInPng: "",
      imageWithTextInBmp: "",
      imageWithTextInGif: "",
      imageWithTextInTiff: "",
    };
  }

  async componentWillMount() {
    await this.getNewResult();
  }

  getNewResult = async () => {
    //picture watermark
    //jpeg and png
    const image = await watermark.addWatermark(
      "http://localhost:8081/static/images/2.jpeg",
      "http://localhost:8081/static/images/logo192.png"
    );
    //console.log("this is jpeg", image);

    //bmp
    const imageInBmp = await watermark.addWatermark(
      "http://localhost:8081/static/images/1.bmp",
      "http://localhost:8081/static/images/logo192.png"
    );

    //gif
    const imageInGif = await watermark.addWatermark(
      "http://localhost:8081/static/images/2.gif",
      "http://localhost:8081/static/images/logo192.png"
    );
    //console.log("this is gif", imageInGif);

    //tiff
    const imageInTiff = await watermark.addWatermark(
      "http://localhost:8081/static/images/1.tiff",
      "http://localhost:8081/static/images/logo192.png"
    );
    //console.log("this is tiff", imageInTiff);

    //////==================================
    //text watermark

    //jpeg
    const imageWithText = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/2.jpeg",
      {text: "Kelly Kang", textSize: 8}
    );

    console.log("this is jpeg with text", imageWithText);

    //png
    const imageWithTextInPng = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/png image.png",
      {text: "Kelly Kang", textSize: 8}
    );

    //bmp
    const imageWithTextInBmp = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/1.bmp",
      {text: "Kelly Kang", textSize: 8}
    );

    //gif
    const imageWithTextInGif = await watermark.addTextWatermark(
      // "http://localhost:8081/static/images/2.gif",
      myGifBuffer,
      {text: "Kelly Kang", textSize: 8}
    );

    console.log("this is gif with text", imageInGif);

    //tiff
    const imageWithTextInTiff = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/1.tiff",
      {text: "Kelly Kang", textSize: 8}
    );

    this.setState({
      imageWithWatermark: image,
      imageWithTextWatermark: imageWithText,
      imageInBmp: imageInBmp,
      imageInGif: imageInGif,
      imageInTiff: imageInTiff,
      imageWithTextInPng: imageWithTextInPng,
      imageWithTextInBmp: imageWithTextInBmp,
      imageWithTextInGif: imageWithTextInGif,
      imageWithTextInTiff: imageWithTextInTiff,
    });
  };
  componentDidMount() {
    // this.callAPI() {
    //     fetch("http://localhost:9000/testAPI")
    //         .then(res => res.text())
    //         .then(res => this.setState({ apiResponse: res }))
    //         .catch(err => err);
    // }
  }

  render() {
    // We use browser history because this example is going to be hosted dynamically
    // for staic sites, you can use createHashHistory()
    const history = createBrowserHistory();
    // var options = {
    //   ratio: 0.6, // Should be less than one
    //   opacity: 0.6, //Should be less than one
    //   dstPath: "/watermark.jpg",
    // };

    //store.dispatch(getCSRFToken(() => { })) //It is NOT good idea to set global CSRF Token, as the Token will change
    //hence we should only do that if everytime we dispatch getCSRFToken() we pass the setAxiosCSRF to it.

    //------------------
    //store can be used to do getState(), dispatch(action), subscrib(listener),...
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route
              path={Urls.CreatePost2AddrPhotos}
              component={() => <CreatePost2AddrPhotos />}
            /> */}

          <Route
            path="/"
            exact
            component={() =>
              <div>
                <p>
                  {"This is jpeg and png👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithWatermark}
                />
                <br />
                <p>
                  {"This is bmp👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageInBmp}
                />
                <br />
                <p>
                  {"This is gif👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={
                    this.state.imageInGif //{"http://localhost:8081/static/images/2.gif"}
                  }
                />

                <br />
                <p>
                  {"This is tiff👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageInTiff}
                />
                <br />
                <p>
                  {"This is jpeg👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextWatermark}
                />
                <br />
                <p>
                  {"This is png with text👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextInPng}
                />
                <br />
                <p>
                  {"This is bmp with text👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextInBmp}
                />
                <br />
                <p>
                  {"This is gif with text👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextInGif} //{myGifBuffer} //{this.state.imageWithTextInGif}
                />
                <br />
                <p>
                  {"This is original buffer gif👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={
                    myGifBuffer //{"http://localhost:8081/static/images/2.gif"}
                  }
                />
                <br />
                <p>
                  {"This is tiff with text👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextInTiff}
                />
              </div>}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
