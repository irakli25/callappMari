

export function Theme() {

    this.DarkMode = () => {

        document.documentElement.style.setProperty('--dashboard-bg-color', '#1C323F');
        document.documentElement.style.setProperty('--block-bg-color', '#15222C');
        document.documentElement.style.setProperty('--text-color', '#929292');
        document.documentElement.style.setProperty('--textcolor', '#fff');
        document.documentElement.style.setProperty('--white', '#15222C');
        document.documentElement.style.setProperty('--dark-sky', '#F7F6FF');
        document.documentElement.style.setProperty('--text-shadow', '0px 7px 0px rgb(10 10 10 / 68%)');
        document.documentElement.style.setProperty('--dark-blue', '#15222C');
        document.documentElement.style.setProperty('--menu-text', '#929292');
        document.documentElement.style.setProperty('--task-table', '#373F45');
        document.documentElement.style.setProperty('--task-info', '#1C323F');
        document.documentElement.style.setProperty('--chat-msg', '#1C323F');
        document.documentElement.style.setProperty('--sent-msg', '#1C323F');
        document.documentElement.style.setProperty('--sent-msg2', '#7E0330');
        document.documentElement.style.setProperty('--type-text', '#A8A8A8');
        document.documentElement.style.setProperty('--icon-color', 'invert(100%) sepia(100%) saturate(2%) hue-rotate(32deg) brightness(103%) contrast(101%)');
        document.documentElement.style.setProperty('--icon-color2', 'invert(15%) sepia(75%) saturate(5767%) hue-rotate(336deg) brightness(101%) contrast(102%)');
        document.documentElement.style.setProperty('--main-icon', 'invert(16%) sepia(90%) saturate(7479%) hue-rotate(334deg) brightness(102%) contrast(104%)');
        document.documentElement.style.setProperty('--main-color', '#FF005C');
        document.documentElement.style.setProperty('--kendo-border', '#15222C');
        document.documentElement.style.setProperty('--kendo-table', '#1C323F');
        document.documentElement.style.setProperty('--text', '#fff');
        document.documentElement.style.setProperty('--background', '#1C323F');
        document.documentElement.style.setProperty('--kendoborder', '#bdb6b6');
        document.documentElement.style.setProperty('--kendo-selector-bg', '#1C323F');
        document.documentElement.style.setProperty('--kendo-selector-text', '#FFFFFF');
        document.documentElement.style.setProperty('--calendar-bg', '#1C323F');
        document.documentElement.style.setProperty('--calendar-text', '#FFFFFF');
        document.documentElement.style.setProperty('--kendo-selector-border', '#1C323F');
        document.documentElement.style.setProperty('--kendo-selector-hover', '#233d4c');
        document.documentElement.style.setProperty('--kendo-table-data', '#1C323F');
        document.documentElement.style.setProperty('--kendo-date-btn-bg', '#15222c');
        document.documentElement.style.setProperty('--reportinfo-table-bg', '#1c323f');
        document.documentElement.style.setProperty('--reportinfo-table-color', '#fff');
        document.documentElement.style.setProperty('--reportinfo-table-color2', '#9cadff');
        document.documentElement.style.setProperty('--dashboard-input', '#1C323F');
        document.documentElement.style.setProperty('--block-input-img-hover', '#34495c');
        document.documentElement.style.setProperty('--block-input-img', '#fff');
        document.documentElement.style.setProperty('--header-icon-color', '#fff');


        localStorage.setItem("theme", "dark");

    }

    this.LightMode = () => {

        document.documentElement.style.setProperty('--dashboard-bg-color', '#F7F6FF');
        document.documentElement.style.setProperty('--block-bg-color', '#FFF');
        document.documentElement.style.setProperty('--text-color', '#404040');
        document.documentElement.style.setProperty('--textcolor', '#2C3E50');
        document.documentElement.style.setProperty('--white', '#FFF');
        document.documentElement.style.setProperty('--dark-sky', '#0d1340');
        document.documentElement.style.setProperty('--text-shadow', '3px 8px 0px rgb(0 0 0 / 28%)')
        document.documentElement.style.setProperty('--dark-blue', 'rgb(53, 79, 166)');
        document.documentElement.style.setProperty('--menu-text', '#FFFFFF');
        document.documentElement.style.setProperty('--task-table', '#F7F9FA');
        document.documentElement.style.setProperty('--task-info', '#E8E8E8');
        document.documentElement.style.setProperty('--chat-msg', '#EBF6FF');
        document.documentElement.style.setProperty('--sent-msg', '#AEE1FF');
        document.documentElement.style.setProperty('--sent-msg2', '#D2D2D2');
        document.documentElement.style.setProperty('--type-text', '#1E88E5');
        document.documentElement.style.setProperty('--icon-color', 'invert(5%) sepia(16%) saturate(2%) hue-rotate(314deg) brightness(94%) contrast(96%)');
        document.documentElement.style.setProperty('--icon-color2', 'invert(5%) sepia(16%) saturate(2%) hue-rotate(314deg) brightness(94%) contrast(96%)');
        document.documentElement.style.setProperty('--main-icon', 'invert(16%) sepia(90%) saturate(7479%) hue-rotate(334deg) brightness(102%) contrast(104%)');
        document.documentElement.style.setProperty('--main-color', '#FF005C');
        document.documentElement.style.setProperty('--kendo-border', '#B1BAD7');
        document.documentElement.style.setProperty('--kendo-table', '#f5f5f5');
        document.documentElement.style.setProperty('--source-color', '#f5f5f5');
        document.documentElement.style.setProperty('--text', '#15222C');
        document.documentElement.style.setProperty('--background', '#fff');
        document.documentElement.style.setProperty('--kendoborder', '#B1BAD7');
        document.documentElement.style.setProperty('--kendo-selector-bg', '#f5f5f5');
        document.documentElement.style.setProperty('--kendo-selector-text', '#404040');
        document.documentElement.style.setProperty('--kendo-selector-border', '#A8A8A8');
        document.documentElement.style.setProperty('--kendo-selector-hover', '#ebebeb');
        document.documentElement.style.setProperty('--calendar-bg', '#DDEDFB ');
        document.documentElement.style.setProperty('--calendar-text', '#1E88E5');
        document.documentElement.style.setProperty('--kendo-table-data', '#F7F9FA');
        document.documentElement.style.setProperty('--kendo-date-btn-bg', '#f5f5f5');
        document.documentElement.style.setProperty('--reportinfo-table-bg', '#F7F9FA');
        document.documentElement.style.setProperty('--reportinfo-table-color', '#3E4457');
        document.documentElement.style.setProperty('--reportinfo-table-color2', '#3F53B7');
        document.documentElement.style.setProperty('--dashboard-input', '#ddedfb');
        document.documentElement.style.setProperty('--block-input-img-hover', '#96c5ee');
        document.documentElement.style.setProperty('--block-input-img', 'rgb(0 0 0 / 29%)');
        document.documentElement.style.setProperty('--header-icon-color', '#181818');


        localStorage.setItem("theme", "light")

    }

    this.setTheme = () => {

        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
            if (event.matches) {
                this.DarkMode();
            } else {
                this.LightMode();
            }
        })

        var ThemeStorage = localStorage.getItem('theme');
    
        if(ThemeStorage == null){
            this.LightMode();
        }else if(ThemeStorage == 'dark'){
            this.DarkMode();
        }else{
            this.LightMode();
        }

    }


    this.onSwitchClick = () => {

        $(document).on('click', "switch[theme] input", () => {
            if($('switch[theme] input').is(":checked")){
                this.DarkMode();
            }else{
                this.LightMode();
            }
        })

    }


    this.getTheme = () => {

        return localStorage.getItem("theme");
    }


}