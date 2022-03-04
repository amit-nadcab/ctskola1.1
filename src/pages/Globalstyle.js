import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
body , .light-theme-color, #preloader, .nav-link.active, #vertical_tab_nav li a.active,.mp_exside_btn,.btn-primary:hover{
  background: ${({ theme }) => theme.bodyback}!important;
}
.nav-link.active, #vertical_tab_nav li a.active, #pln_currency.active{
  color: ${({ theme }) => theme.activetext}!important;
}
.coinsfather-theme-color ,.theme-color,#vertical_tab_nav{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  #pln_currency,.coinsfather-theme-color p, .coinsfather-theme-color a, #coins_table p, #coins_table tr, .mdfthemetxt,#vertical_tab_nav li a{
    color: ${({ theme }) => theme.text}!important;
  }
  .my-side-shadow{
    box-shadow:${({ theme }) => theme.side_shadow}!important;
  }
  .my-sidebox-shadow{
    box-shadow:${({ theme }) => theme.sidebox_shadow}!important;
  }
  .graph-head{
    background:${({ theme }) => theme.graph_head.bg}!important;
    border-bottom:${({ theme }) => theme.graph_head.border_bottom}!important;
  }
  .exide-bg{
    background:${({ theme }) => theme.graph_head.bg}!important;
    border-bottom:${({ theme }) => theme.graph_head.border_bottom}!important;
  }
  .pair-border{
    border-top:${({ theme }) => theme.pair_border.b_top} !important;
    border-bottom:${({ theme }) => theme.pair_border.b_bottom} !important;
  }
  .shead-bg{
    background:${({ theme }) => theme.shead_bg} !important;
  }
  .shead-circle{
    background:${({ theme }) => theme.shead_circle} !important;
  }
  .security_head::after{
    background:${({ theme }) => theme.shead_circle} !important;
  }
  .buy-sell-form-bg{
    background:${({ theme }) => theme.buy_sell_form_bg} !important;
  }
  .buy-sell-theme{
    border:${({ theme }) => theme.buy_sell_theme.b} !important;
    color:${({ theme }) => theme.buy_sell_theme.c} !important;
  }
  .low-price{
    border:${({ theme }) => theme.low_price.b} !important;
    color:${({ theme }) => theme.low_price.c} !important;
  }
  .high-price{
    border:${({ theme }) => theme.high_price.b} !important;
    color:${({ theme }) => theme.high_price.c} !important;
  }
  .g_color{
    color:${({ theme }) => theme.g_color.clr} !important;
  }
  `;
