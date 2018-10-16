$(document).ready(function () {
    "use strict";


    if (window.location.pathname.indexOf('dashboard') !== -1) {
        $('li#dashboard').addClass('active');
    }

    if (window.location.pathname.indexOf('product') !== -1) {
        $('li#product').addClass('active');
        cms_product_search();
        cms_load_listgroup();
        cms_paging_manufacture(1);
        cms_paging_unit(1);
        cms_paging_group(1);
        cms_loadListproOption();
        cms_paging_product(1);
    }

    if (window.location.pathname.indexOf('orders') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });

        cms_set_current_week();
        $('li#orders').addClass('active');
        cms_paging_order(1);
        cms_order_search();
    }

    if (window.location.pathname.indexOf('receipt') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });

        $('#receipt_date').datetimepicker({
            autoclose: true
        });

        cms_set_current_week();
        $('li#receipt').addClass('active');
        cms_paging_receipt(1);
        cms_receipt_search();
    }

    if (window.location.pathname.indexOf('payment') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });

        $('#payment_date').datetimepicker({
            autoclose: true
        });
        cms_set_current_week();
        $('li#payment').addClass('active');
        cms_paging_payment(1);
        cms_payment_search();
    }

    if (window.location.pathname.indexOf('transfer') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });

        cms_set_current_week();
        $('li#transfer').addClass('active');
        cms_paging_transfer(1);
        cms_transfer_search();
    }

    if (window.location.pathname.indexOf('revenue') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });
        cms_set_current_week();
        $('li#revenue').addClass('active');
        cms_paging_revenue(1);
        cms_revenue_search();

        $('.input-daterange').on("change", function (e) {
            cms_paging_revenue(1);
        });
    }

    if (window.location.pathname.indexOf('profit') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });
        cms_set_current_week();
        $('li#profit').addClass('active');
        cms_paging_profit(1);
        cms_profit_search();

        $('.input-daterange').on("change", function (e) {
            cms_paging_profit(1);
        });
    }

    if (window.location.pathname.indexOf('input') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });
        cms_set_current_week();
        cms_input_search();
        $('li#input').addClass('active');
        cms_paging_input(1);
    }

    if (window.location.pathname.indexOf('inventory') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });
        $('li#inventory').addClass('active');
        cms_inventory_search();
        cms_paging_inventory(1);
        cms_loadListInvOption();
    }

    if (window.location.pathname.indexOf('debt') !== -1) {
        $('.input-daterange').datepicker({
            format: "yyyy-mm-dd",
            todayBtn: "linked",
            language: "vi",
            autoclose: true,
            todayHighlight: true,
            toggleActive: true
        });

        cms_set_current_week();
        $('li#debt').addClass('active');
        cms_paging_debt(1);
        cms_debt_search();
    }

    if (window.location.pathname.indexOf('setting') !== -1) {
        $('li#setting').addClass('active');
        cms_upstore();
        cms_crfunc();
        cms_upfunc();
        cms_crgroup();
        cms_radiogroup();
        cms_selboxgroup();
        cms_selboxstock();
        initBasic();
    }

    if (window.location.pathname.indexOf('customer') !== -1) {
        $('li#customer').addClass('active');
        $('#customer_birthday').datetimepicker({
            timepicker: false,
            format: 'Y/m/d',
            formatDate: 'Y/m/d',
            autoclose: true,
            defaultDate: '1989/01/01'
        });

        cms_customer_search();
        cms_supplier_search();
        cms_loadListCusOption();
        cms_loadListSupOption();
        cms_paging_listcustomer(1);
        cms_paging_supplier(1);
    }

    $('#customer_photo').on('change', function () {
        $("#customer_img_preview").html('');
        $("#customer_image_upload_form").ajaxForm({
            target: '#customer_img_preview'
        }).submit();
    });

    $('#supplier_photo').on('change', function () {
        $("#supplier_img_preview").html('');
        $("#supplier_image_upload_form").ajaxForm({
            target: '#supplier_img_preview'
        }).submit();
    });

    $('#receipt_photo').on('change', function () {
        $("#receipt_img_preview").html('');
        $("#receipt_image_upload_form").ajaxForm({
            target: '#receipt_img_preview'
        }).submit();
    });

    $('#edit_receipt_photo').on('change', function () {
        $("#edit_receipt_img_preview").html('');
        $("#edit_receipt_image_upload_form").ajaxForm({
            target: '#edit_receipt_img_preview'
        }).submit();
    });

    $('#payment_photo').on('change', function () {
        $("#payment_img_preview").html('');
        $("#payment_image_upload_form").ajaxForm({
            target: '#payment_img_preview'
        }).submit();
    });

    cms_search_box_customer();
    cms_search_box_sup();
    cms_change_store();
});

$(document).on('ready ajaxComplete', function () {
    cms_func_common();
});

function toggle_promotion(){
    $('#promotion').toggle();
}

function cms_func_common() {
    "use strict";
    cms_del_pro_order();
    cms_del_pro_order_sell();
    cms_del_pro_return();
    cms_del_pro_input();
    cms_del_pro_transfer();
    fix_height_sidebar();
    cms_del_icon_click('.del-cys', '#search-box-cys');
    cms_del_icon_click('.del-mas', '#search-box-mas');
    btnClick('.btn-smf', '.btn-sm-after');

    $('#photo').on('change', function () {
        $("#img_preview").html('');
        $("#image_upload_form").ajaxForm({
            target: '#img_preview'
        }).submit();
    });

    $('#edit_customer_photo').on('change', function () {
        $("#edit_customer_img_preview").html('');
        $("#edit_customer_image_upload_form").ajaxForm({
            target: '#edit_customer_img_preview'
        }).submit();
    });

    $('#edit_supplier_photo').on('change', function () {
        $("#edit_supplier_img_preview").html('');
        $("#edit_supplier_image_upload_form").ajaxForm({
            target: '#edit_supplier_img_preview'
        }).submit();
    });

    /*
     * check password match
     *************************************/
    $('#pass2').on('inputkeypress', function () {
        var pass1 = $('#pass1').val(), pass2 = $('#pass2').val();
        if (!is_match(pass1, pass2)) {
            alert('Mật khẩu nhập lại không khớp!');
            $("#pass2").focus();
            return false;
        }
    });

    if (window.location.pathname.indexOf('customer') !== -1) {
        $("input.receipt_money").keyup(function () {
            var $total_receipt_money = 0;
            $('input.receipt_money').each(function () {
                var $receipt_money = parseInt(cms_decode_currency_format($(this).val()));
                $total_receipt_money += $receipt_money;
            });
            $('#total_receipt_money').val(cms_encode_currency_format($total_receipt_money));
        });

        $("input#total_receipt_money").keyup(function () {
            var $total_receipt_money = parseInt(cms_decode_currency_format($('#total_receipt_money').val()));
            if ($total_receipt_money > 0) {
                $('input.receipt_money').each(function () {
                    var $order_lack = parseInt(cms_decode_currency_format($(this).parents('tr').find('td.order_lack').text()));
                    if ($total_receipt_money < $order_lack) {
                        $(this).val(cms_encode_currency_format($total_receipt_money));
                        return false;
                    } else {
                        $(this).val(cms_encode_currency_format($order_lack));
                        $total_receipt_money = $total_receipt_money - $order_lack;
                    }
                });
            }
        });

        $("input.payment_money").keyup(function () {
            var $total_payment_money = 0;
            $('input.payment_money').each(function () {
                var $payment_money = parseInt(cms_decode_currency_format($(this).val()));
                $total_payment_money += $payment_money;
            });
            $('#total_payment_money').val(cms_encode_currency_format($total_payment_money));
        });

        $("input#total_payment_money").keyup(function () {
            var $total_payment_money = parseInt(cms_decode_currency_format($('#total_payment_money').val()));
            if ($total_payment_money > 0) {
                $('input.payment_money').each(function () {
                    var $input_lack = parseInt(cms_decode_currency_format($(this).parents('tr').find('td.input_lack').text()));
                    if ($total_payment_money < $input_lack) {
                        $(this).val(cms_encode_currency_format($total_payment_money));
                        return false;
                    } else {
                        $(this).val(cms_encode_currency_format($input_lack));
                        $total_payment_money = $total_payment_money - $input_lack;
                    }
                });
            }
        });
    }

    if (window.location.pathname.indexOf('input') !== -1) {
        $("input.quantity_product_order").keyup(function () {
            cms_load_infor_order();
        });

        $("input.price-input").keyup(function () {
            cms_load_infor_import();
        });

        $("input.price-order").keyup(function () {
            cms_load_infor_order();
        });

        $(".discount-order").keyup(function () {
            cms_load_infor_order();
        });

        $(".customer-pay").keyup(function () {
            var customer_pay;
            if ($('input.customer-pay').val() == '')
                customer_pay = 0;
            else
                customer_pay = cms_decode_currency_format($('input.customer-pay').val());

            var total_after_discount = cms_decode_currency_format($('.total-after-discount').text());
            var debt = total_after_discount - customer_pay;

            if (debt >= 0) {
                $('div.debt').text(cms_encode_currency_format(debt));
                $('label.debt').text('Nợ');
            }
            else {
                $('div.debt').text(cms_encode_currency_format(-debt));
                $('label.debt').text('Tiền thừa');
            }
        });
    }

    if (window.location.pathname.indexOf('orders') !== -1) {
        $('#customer_id').on('change', function () {
            cms_paging_order(1);
        });

        $('#order_status').on('change', function () {
            cms_paging_order(1);
        });

        $("input.discount-order").keyup(function () {
            cms_load_infor_order();
        });

        $("input.discount-item").keyup(function () {
            var $dc = cms_decode_currency_format($('input.discount-item').val());
            var $tq = parseInt($('div.total-quantity').text());
            var $rs = $dc * $tq;
            $('input.discount-order').val(cms_encode_currency_format($rs));
            cms_load_infor_order();
        });

        $("input.discount-percent-order").keyup(function () {
            var $percent = cms_decode_currency_format($('input.discount-percent-order').val());
            var $total_money = cms_decode_currency_format($('div.total-money').text());
            if ($percent > 100) {
                $('input.discount-percent-order').val(100);
                $('input.discount-order').val(cms_encode_currency_format($total_money));
                cms_load_infor_order();
            } else {
                var $discount = ($total_money * $percent) / 100;
                $('input.discount-order').val(cms_encode_currency_format($discount));
                cms_load_infor_order();
            }
        });

        $('#vat').on('change', function () {
            cms_load_infor_order();
        });

        $("input.quantity_product_order").keyup(function () {
            cms_load_infor_order();
        });

        $("input.price-order").keyup(function () {
            cms_load_infor_order();
        });

        $(".customer-pay").keyup(function () {
            var customer_pay;
            if ($('input.customer-pay').val() == '')
                customer_pay = 0;
            else
                customer_pay = cms_decode_currency_format($('input.customer-pay').val());

            var total_after_discount = cms_decode_currency_format($('.total-after-discount').text());
            var debt = total_after_discount - customer_pay;

            if (debt >= 0) {
                $('div.debt').text(cms_encode_currency_format(debt));
                $('label.debt').text('Nợ');
            }
            else {
                $('div.debt').text(cms_encode_currency_format(-debt));
                $('label.debt').text('Tiền thừa');
            }
        });

        $("input#customer_pay_return").keyup(function () {
            var total_money_return = cms_decode_currency_format($('div#total_money_return').text());
            if (total_money_return > 0) {
                var customer_pay;
                if ($('input#customer_pay_return').val() == '')
                    customer_pay = 0;
                else
                    customer_pay = cms_decode_currency_format($('input#customer_pay_return').val());

                var total_after_discount = cms_decode_currency_format($('#total_money_return').text());
                var debt = total_after_discount - customer_pay;

                if (debt >= 0) {
                    $('div.debt').text(cms_encode_currency_format(debt));
                    $('label.debt').text('Còn nợ');
                }
                else {
                    $('div.debt').text(cms_encode_currency_format(-debt));
                    $('label.debt').text('Tiền thừa');
                }
            } else {
                $('input#customer_pay_return').val(cms_encode_currency_format(total_money_return));
            }

        });

        $("input.quantity_return").keyup(function () {
            cms_load_infor_order_return();
        });
        $("input.price_return").keyup(function () {
            cms_load_infor_order_return();
        });
        $("input.quantity_sell").keyup(function () {
            cms_load_infor_order_return();
        });
        $("input.price_sell").keyup(function () {
            cms_load_infor_order_return();
        });
        $("input#discount_return").keyup(function () {
            cms_load_infor_order_return();
        });
    }

    if (window.location.pathname.indexOf('pos') !== -1) {
        $("input.discount-order").keyup(function () {
            cms_load_infor_order();
        });

        $("input.quantity_product_order").keyup(function () {
            cms_load_infor_order();
        });

        $("input.price-order").keyup(function () {
            cms_load_infor_order();
        });

        $('#vat').on('change', function () {
            cms_load_infor_order();
        });

        $("input.discount-item").keyup(function () {
            var $dc = cms_decode_currency_format($('input.discount-item').val());
            var $tq = parseInt($('div.total-quantity').text());
            var $rs = $dc * $tq;
            $('input.discount-order').val(cms_encode_currency_format($rs));
            cms_load_infor_order();
        });

        $("input.discount-percent-order").keyup(function () {
            var $percent = cms_decode_currency_format($('input.discount-percent-order').val());
            var $total_money = cms_decode_currency_format($('div.total-money').text());
            if ($percent > 100) {
                $('input.discount-percent-order').val(100);
                $('input.discount-order').val(cms_encode_currency_format($total_money));
                cms_load_infor_order();
            } else {
                var $discount = ($total_money * $percent) / 100;
                $('input.discount-order').val(cms_encode_currency_format($discount));
                cms_load_infor_order();
            }
        });

        $(".customer-pay").keyup(function () {
            var customer_pay;
            if ($('input.customer-pay').val() == '')
                customer_pay = 0;
            else
                customer_pay = cms_decode_currency_format($('input.customer-pay').val());

            var total_after_discount = cms_decode_currency_format($('.total-after-discount').text());
            var debt = total_after_discount - customer_pay;

            if (debt >= 0) {
                $('div.debt').text(cms_encode_currency_format(debt));
                $('label.debt').text('Nợ');
            }
            else {
                $('div.debt').text(cms_encode_currency_format(-debt));
                $('label.debt').text('Tiền thừa');
            }
        });
    }

    $('.new-password').on('keyup', function () {
        var renewpass = $.trim($('#renewpass').val());
        var newpass = $.trim($('#newpass').val());
        if (renewpass == newpass) {
            $('#newpass-wrong').hide();
        } else {
            $('#newpass-wrong').show();
        }
    });

    $('#btn-changepass').on('click', function () {
        $(this).hide();
        $('.form-hide').slideDown('200');
    });

    $('#btn-cancel-pass').on('click', function () {
        $('.form-hide').slideUp('200');
        $('#btn-changepass').show();
    });

    $('.ajax-success').popover('show');

    $('body').on('click', '.chkAll', function () {
        var $checkboxies = $(this).closest('table').find('.chk');
        if ($(this).prop('checked')) {
            $checkboxies.prop('checked', true);
        } else {
            $checkboxies.prop('checked', false);
        }
    });

    $('ul.pagination li.active').click(function (event) {
        event.preventDefault();
    });

    $("input.discount-import").keyup(function () {
        cms_load_infor_import();
    });

    $("input.quantity_product_import").keyup(function () {
        cms_load_infor_import();
    });

    $(".txtNumber").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(".txtMoney").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(".txtMoney").keyup(function () {
        if ($(this).val() == '')
            $(this).val(0);
        else {
            var value = cms_decode_currency_format($(this).val());
            $(this).val(cms_encode_currency_format(value));
        }
    });

    $('.chk').on('change', function (e) {
        e.preventDefault();
        if ($(this).prop('checked') == false) {
            $('.chkAll').prop('checked', false);
        }
        if ($('.chk:checked').length == $('.chk').length) {
            $('.chkAll').prop('checked', true);
        }
    });
}

function hotkey(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    //F2
    if (keycode == '113') {
        $('#search-pro-box').focus();
    }
    //F4
    if (keycode == '115') {
        $('#search-box-cys').focus();
    }
    //F7
    if (keycode == '118') {
        $('.discount-order').focus();
    }
    //F8
    if (keycode == '119') {
        $('.customer-pay').focus();
    }
    //F9
    if (keycode == '120') {
        cms_save_orders(3);
    }
    //F10
    if (keycode == '121') {
        cms_save_orders(4);
    }
}

function cms_del_pro_order() {
    $('body').on('click', '.del-pro-order', function () {
        $(this).parents('tr').remove();
        cms_load_infor_order();
        $seq = 0;
        $('tbody#pro_search_append tr').each(function () {
            $seq += 1;
            value_input = $(this).find('td.seq').text($seq);
        });
    });
}

function cms_del_pro_order_sell() {
    $('body').on('click', '.del-pro-sell', function () {
        $(this).parents('tr').remove();
        cms_load_infor_order_return();
        $seq = 0;
        $('tbody#product_sell tr').each(function () {
            $seq += 1;
            value_input = $(this).find('td.seq').text($seq);
        });
    });
}

function cms_del_pro_return() {
    $('body').on('click', '.del-pro-return', function () {
        $(this).parents('tr').remove();
        cms_load_infor_order_return();
        $seq = 0;
        $('tbody#product_return tr').each(function () {
            $seq += 1;
            value_input = $(this).find('td.seq').text($seq);
        });
    });
}

function cms_del_pro_input() {
    $('body').on('click', '.del-pro-input', function () {
        $(this).parents('tr').remove();
        cms_load_infor_import();
        $seq = 0;
        $('tbody#pro_search_append tr').each(function () {
            $seq += 1;
            value_input = $(this).find('td.seq').text($seq);
        });
    });
}

function cms_del_pro_transfer() {
    $('body').on('click', '.del-pro-transfer', function () {
        $(this).parents('tr').remove();
        $seq = 0;
        $('tbody#pro_search_append tr').each(function () {
            $seq += 1;
            value_input = $(this).find('td.seq').text($seq);
        });
    });
}

/*
 * Process ajax request
 *
 * $param là một object {'type','url', 'data', 'callback'}
 *
 * default type POST
 /*********************************************************************/
function cms_adapter_ajax($param) {
    $.ajax({
        url: $param.url,
        type: $param.type,
        data: $param.data,
        async: true,
        success: $param.callback
    });
}

function cms_show_receipt_order() {
    $("#receipt_order").css({
        'position': 'absolute',
        'right': $("#detail_payment").width(),
        'bottom': 0
    }).show("slow");
}

function cms_show_payment_input() {
    $("#payment_input").css({
        'position': 'absolute',
        'right': $("#detail_payment").width(),
        'bottom': 0
    }).show("slow");
}

function cms_hide_receipt_order() {
    $("#receipt_order").hide("slow");
}

function cms_hide_payment_input() {
    $("#payment_input").hide("slow");
}

/*
 * Tạo nhân viên
 /****************************************/
function cms_cruser() {
    "use strict";
    var $display = $.trim($('#frm-cruser #display_name').val());
    var $username = $.trim($('#frm-cruser #manv').val());
    var $mail = $.trim($('#frm-cruser #mail').val());
    var $password = $.trim($('#frm-cruser #password').val());
    var $group = $('#frm-cruser .group-user .group-selbox #sel-group').val();
    var $stock = $('#frm-cruser .stock-selbox #sel-stock').val();
    $('#frm-cruser .group-user .group-selbox #sel-group').on('change', function () {
        $group = $(this).val();
    });
    if ($display.length == 0) {
        $('.error-display_name').text('Vui lòng nhập tên hiển thị!');
    } else {
        $('.error-display_name').text('');
    }
    if ($username.length == 0) {
        $('.error-manv').text('Vui lòng nhập email!');
    } else {
        $('.error-manv').text('');
    }
    if ($mail.length == 0) {
        $('.error-mail').text('Vui lòng nhập email!');
    } else {
        $('.error-mail').text('');
    }
    if ($password.length == 0) {
        $('.error-password').text('Vui lòng nhập mật khẩu!');
    } else {
        $('.error-password').text('');
    }

    if ($display && $mail && $password && $group && $username) {
        var $data = {
            'display': $display,
            'username': $username,
            'mail': $mail,
            'group': $group,
            'password': $password,
            'store_id': $stock
        };
        var $param = {
            'type': 'POST',
            'url': 'ajax/cms_cruser',
            'data': $data,
            'callback': function (data) {
                if (data != '1') {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.btn-close').trigger('click');
                    cms_upuser();
                    $('.ajax-success-ct').html('Thêm thành viên mới thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_upuser() {
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_upuser',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#user .table-user tbody').html(data);
            } else {
                var $html = '<tr><td colspan="7" class="text-center">Không có người dùng để hiển thị</td> </tr>';
                $('#user.table-user tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Lưu nhân viên
 /***************************/
function cms_save_item_user(id) {
    var $display_name = $('#user .table-user tr.edit-tr-item-' + id + ' td.itdisplay_name input').val();
    var $mail = $('#user .table-user tr.edit-tr-item-' + id + ' td.itemail input').val();
    var $group = $('#user .table-user tr.edit-tr-item-' + id + ' td.itgroup_name #sel-group').val();
    var $status = $('#user .table-user tr.edit-tr-item-' + id + ' td.ituser_status .ituser_status').val();
    var $data = {
        'data': {
            'id': id,
            'display_name': $display_name,
            'email': $mail,
            'group_id': $group,
            'user_status': $status
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_save_item_user',
        'data': $data,
        'callback': function (data) {
            if (data == '1') {
                cms_upuser();
                cms_upgroup();
            } else if (data == '0') {
                alert('Lưu không thành công!');
            } else {
                $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_update_store($id) {
    var $store_name = $('#store_name_' + $id).val();
    var $data = {
        'data': {
            'store_name': $store_name
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'store/cms_update_store/' + $id,
        'data': $data,
        'callback': function (data) {
            if (data == '1') {
                cms_upstore();
            } else if (data == '0') {
                alert('Lưu không thành công!');
            } else {
                $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Xóa nhân viên
 /***************************/
function cms_del_usitem($id) {
    var conf = confirm('Bạn chắc chắn muốn xóa!');
    if (conf) {
        // alert('Chức năng xóa nhân viên bị khóa do đây là tài khoản demo');
        var $param = {
            'type': 'POST',
            'url': 'ajax/cms_del_usitem',
            'data': {'id': $id},
            'callback': function (data) {
                if (data != '0') {
                    cms_upuser();
                    $('.ajax-success-ct').html('Xóa thành viên thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    alert('Không thể xóa nhân viên!');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_store($id) {
    var conf = confirm('Bạn chắc chắn muốn xóa!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'store/cms_del_store',
            'data': {'id': $id},
            'callback': function (data) {
                if (data != '0') {
                    cms_upstore();
                    $('.ajax-success-ct').html('Xóa kho thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    alert('Không thể xóa kho này!');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

/*
 * Tạo chức năng
 /****************************************/
function cms_crfunc() {
    "use strict";
    $('.btn-crfunc').on('click', function (e) {
        e.preventDefault();
        var $permiss_url = $.trim($('#permisstion_url').val());
        var $permiss_name = $.trim($('#permisstion_name').val());

        if ($permiss_url.length == 0) {
            $('.error-permisstion_url').text('Vui lòng nhập url');
        } else {
            $('.error-permisstion_url').text('');
        }
        if ($permiss_name.length == 0) {
            $('.error-permisstion_name').text('Vui lòng nhập tên chức năng');
        } else {
            $('.error-permisstion_name').text('');
        }
        if ($permiss_url && $permiss_name) {
            var $param = {
                'type': 'POST',
                'url': 'ajax/cms_crfunc',
                'data': {'url': $permiss_url, 'name': $permiss_name},
                'callback': function (data) {
                    if (data != '1') {
                        $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                    } else {
                        $('.btn-close').trigger('click');
                        cms_upfunc();
                    }
                }
            };
            cms_adapter_ajax($param);
        }
    });
}

function cms_save_template() {
    "use strict";
    var $content = CKEDITOR.instances['ckeditor'].getData();
    var $data = {
        'data': {
            'content': $content
        }
    };
    var id = $('#template').val();
    var $param = {
        'type': 'POST',
        'url': 'setting/cms_save_template/' + id,
        'data': $data,
        'callback': function (data) {
            if (data == '1') {
                $('.ajax-success-ct').html('Lưu mẫu in thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                cms_load_review_template();
            } else if (data == '0') {
                $('.ajax-error-ct').html('Thực hiện không thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
            } else {
                $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_change_password() {
    "use strict";
    var oldpass = $.trim($('#oldpass').val());
    var newpass = $.trim($('#newpass').val());
    var renewpass = $.trim($('#renewpass').val());
    if (newpass != renewpass) {
        alert('Mật khẩu mới không giống nhau, Vui lòng nhập lại');
    } else {
        var $data = {
            'data': {
                'oldpass': oldpass,
                'newpass': newpass
            }
        };
        alert('Chức năng đổi mật khẩu đã bị khóa do đây là tài khoản demo');
        // var $param = {
        //     'type': 'POST',
        //     'url': 'account/cms_change_password/',
        //     'data': $data,
        //     'callback': function (data) {
        //         if (data == '1') {
        //             $('.ajax-success-ct').html('Đổi mật khẩu thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
        //             $('.form-hide').slideUp('200');
        //             $('#btn-changepass').show();
        //         } else if (data == '0') {
        //             $('.ajax-error-ct').html('Mật khẩu củ không đúng!').parent().fadeIn().delay(1000).fadeOut('slow');
        //         } else {
        //             $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
        //         }
        //     }
        // };
        // cms_adapter_ajax($param);
    }
}

function cms_load_template() {
    "use strict";
    var $id = $('#template').val();
    var $param = {
        'type': 'POST',
        'url': 'setting/cms_load_template/' + $id,
        'data': null,
        'callback': function (data) {
            if (data == '0') {
                $('.ajax-error-ct').html('Thực hiện không thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
            } else {
                CKEDITOR.instances['ckeditor'].setData(data);
                cms_load_review_template();
                $('.ajax-success-ct').html('Load mẫu in thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_load_review_template() {
    "use strict";
    var $id = $('#template').val();
    var $param = {
        'type': 'POST',
        'url': 'setting/cms_load_template/' + $id,
        'data': null,
        'callback': function (data) {
            $('#review_template').html(data);
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Danh sách chức năng
 /****************************************/
function cms_upfunc() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_upfunc',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#functions .table-function tbody').html(data);
            } else {
                var $html = '<tr><td colspan="3" class="text-center">Không có chức năng để hiển thị</td> </tr>';
                $('#functions .table-function tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Danh sách chức năng
 /****************************************/
function cms_select_group_upfunc($id) {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_select_group_upfunc/' + $id,
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#functions .table-function tbody').html(data);
            } else {
                var $html = '<tr><td colspan="3" class="text-center">Không có chức năng để hiển thị</td> </tr>';
                $('#functions .table-function tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Thêm nhóm người dùng
 /****************************************/
function cms_crgroup() {
    "use strict";
    $('.btn-crgroup').on('click', function (e) {
        e.preventDefault();
        var $group_name = $.trim($('#group-name').val());

        if ($group_name.length == 0) {
            $('.error-group_name').text('Vui lòng nhập tên nhóm người dùng');
        } else {
            $('.error-group_name').text('');
        }

        if ($group_name) {
            var $param = {
                'type': 'POST',
                'url': 'ajax/cms_crgroup',
                'data': {'group_name': $group_name},
                'callback': function (data) {
                    if (data != '1') {
                        $('.ajax-error-ct').html('Nhóm người dùng đã tồn tại hoặc không đúng!').parent().fadeIn().delay(1000).fadeOut('slow');
                    } else {
                        $('.btn-close').trigger('click');
                        cms_upgroup();
                        cms_radiogroup();
                        $('.ajax-success-ct').html('Bạn đã tạo mới Nhóm người dùng thành công!').parent().fadeIn().delay(1000).fadeOut('slow');

                    }
                }
            };
            cms_adapter_ajax($param);
        }
    });
}

function cms_crstore() {
    "use strict";
    var $store_name = $.trim($('#store-name').val());
    if ($store_name.length == 0) {
        $('.error-store_name').text('Vui lòng nhập tên kho');
    } else {
        $('.error-store_name').text('');
    }

    if ($store_name) {
        var $param = {
            'type': 'POST',
            'url': 'setting/cms_crstore/',
            'data': {'store_name': $store_name},
            'callback': function (data) {
                if (data != '1') {
                    $('.ajax-error-ct').html('Tên kho đã tồn tại hoặc không đúng!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.btn-close').trigger('click');

                    $('.ajax-success-ct').html('Bạn đã tạo kho thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_upstore();
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_save_receipt() {
    "use strict";
    var total_money = cms_decode_currency_format($('#total_money').val());
    if (total_money.length == 0 || total_money == 0) {
        $('.error-total-money').text('Vui lòng nhập số tiền thu');
    } else {
        $('.error-total-money').text('');
        var notes = $('#notes').val();
        var type_id = $('#type_id').val();
        var store_id = $('#store-id').val();
        var receipt_date = $('#receipt_date').val();
        var receipt_image = $('#receipt_img_preview').text();
        var $param = {
            'type': 'POST',
            'url': 'receipt/cms_save_receipt/',
            'data': {
                data: {
                    'total_money': total_money,
                    'receipt_image': receipt_image,
                    'receipt_date': receipt_date,
                    'store_id': store_id,
                    'notes': notes,
                    'type_id': type_id
                }
            },
            'callback': function (data) {
                if (data != '1') {
                    $('.ajax-error-ct').html('Tạo phiếu thu không thành công. Vui lòng thử lại!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('#receipt_photo').val('');
                    $('#receipt_img_preview').html('');
                    $('#notes').val('');
                    $('#total_money').val('');
                    $('#receipt_date').val('');
                    $('.btn-close').trigger('click');
                    $('.ajax-success-ct').html('Bạn đã tạo phiếu thu thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_receipt(1);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_save_payment() {
    "use strict";
    var total_money = cms_decode_currency_format($('#total_money').val());
    if (total_money.length == 0 || total_money == 0) {
        $('.error-total-money').text('Vui lòng nhập số tiền chi');
    } else {
        $('.error-total-money').text('');
        var notes = $('#notes').val();
        var type_id = $('#type_id').val();
        var payment_for = $('#payment_for').val();
        var store_id = $('#store-id').val();
        var payment_date = $('#payment_date').val();
        var payment_image = $('#payment_img_preview').text();
        var $param = {
            'type': 'POST',
            'url': 'payment/cms_save_payment/',
            'data': {
                data: {
                    'payment_for':payment_for,
                    'total_money': total_money,
                    'store_id': store_id,
                    'payment_date': payment_date,
                    'payment_image': payment_image,
                    'notes': notes,
                    'type_id': type_id
                }
            },
            'callback': function (data) {
                if (data != '1') {
                    $('.ajax-error-ct').html('Tạo phiếu chi không thành công. Vui lòng thử lại!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('#payment_img_preview').html('');
                    $('#notes').val('');
                    $('#total_money').val('');
                    $('#payment_date').val('');
                    $('#payment_photo').val('');
                    $('.btn-close').trigger('click');
                    $('.ajax-success-ct').html('Bạn đã tạo phiếu chi thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_payment(1);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_payment($id, $page) {
    "use strict";
    var total_money = cms_decode_currency_format($('#edit_total_money').val());
    if (total_money.length == 0 || total_money == 0) {
        $('.error-edit-total-money').text('Vui lòng nhập số tiền chi');
    } else {
        $('.error-edit-total-money').text('');
        var notes = $('#edit_notes').val();
        var type_id = $('#edit_type_id').val();
        var payment_for = $('#edit_payment_for').val();
        var store_id = $('#store-id').val();
        var payment_date = $('#edit_payment_date').val();
        var payment_image = $('#edit_payment_img_preview').text();
        var $param = {
            'type': 'POST',
            'url': 'payment/cms_update_payment/' + $id,
            'data': {
                data: {
                    'payment_for':payment_for,
                    'total_money': total_money,
                    'store_id': store_id,
                    'payment_date': payment_date,
                    'payment_image': payment_image,
                    'notes': notes,
                    'type_id': type_id
                }
            },
            'callback': function (data) {
                if (data != '1') {
                    $('.ajax-error-ct').html('Cập nhật phiếu chi không thành công. Vui lòng thử lại!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.btn-close').trigger('click');
                    $('.ajax-success-ct').html('Bạn đã cập nhật phiếu chi thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_payment($page);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_receipt($id, $page) {
    "use strict";
    var total_money = cms_decode_currency_format($('#edit_total_money').val());
    if (total_money.length == 0 || total_money == 0) {
        $('.error-edit-total-money').text('Vui lòng nhập số tiền thu');
    } else {
        $('.error-edit-total-money').text('');
        var notes = $('#edit_notes').val();
        var type_id = $('#edit_type_id').val();
        var store_id = $('#store-id').val();
        var receipt_date = $('#edit_receipt_date').val();
        var receipt_image = $('#edit_receipt_img_preview').text();
        var $param = {
            'type': 'POST',
            'url': 'receipt/cms_update_receipt/' + $id,
            'data': {
                data: {
                    'total_money': total_money,
                    'store_id': store_id,
                    'receipt_date': receipt_date,
                    'receipt_image': receipt_image,
                    'notes': notes,
                    'type_id': type_id
                }
            },
            'callback': function (data) {
                if (data != '1') {
                    $('.ajax-error-ct').html('Cập nhật phiếu thu không thành công. Vui lòng thử lại!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.btn-close').trigger('click');
                    $('.ajax-success-ct').html('Bạn đã cập nhật phiếu thu thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_receipt($page);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

/*
 * Danh sách Nhóm
 /****************************************/
function cms_upgroup() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_upgroup',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#functions .table-group tbody').html(data);
            } else {
                var $html = '<tr><td colspan="3" class="text-center">Không có Group để hiển thị</td> </tr>';
                $('#functions .table-group tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}


function cms_upstore() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_upstore',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#stores .table-store tbody').html(data);
            } else {
                var $html = '<tr><td colspan="3" class="text-center">Không có kho để hiển thị</td> </tr>';
                $('#stores .table-store tbody').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Load list group
 /****************************************/
function cms_radiogroup() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_radiogroup',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('#functions .group-user .group-radio').html(data);
            } else {
                var $html = ' <button style="color: green; font-size: 16px;" class="btn btn-default btn-sm create-group" data-toggle="modal" data-target="#create-group"><i class="fa fa-plus"></i></button>';
                $('#functions .group-user .group-radio').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_selboxgroup() {
    "use strict";
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_selboxgroup',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('.group-user .group-selbox').html(data);
                cms_upgroup();
            } else {
                $('.group-user .group-selbox').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

/*
 * Xóa Group
 /***********/
function cms_del_gritem($id) {
    "use strict";
    var conf = confirm('Bạn chắc chắn muốn xóa!');
    if (conf) {
        // alert('Chức năng xóa nhóm người dùng bị khóa do đây là tài khoản demo');
        var $param = {
            'type': 'POST',
            'url': 'ajax/cms_del_gritem',
            'data': {'id': $id},
            'callback': function (data) {
                if (data != '0') {
                    cms_upgroup();
                    cms_radiogroup();
                } else {
                    alert('Không thể xóa nhóm khi đang có nhân viên trong nhóm!');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

/*
 * Lưu quyền cho group
 /***************************/
function cms_savefunc() {
    "use strict";
    var $group_id = $('div.group-user .group-radio input:checked').val();
    if (!$group_id) {
        $('.ajax-error-ct').html('Vui lòng chọn nhóm người sử dụng trước khi thực hiện lưu quyền!').parent().fadeIn().delay(1000).fadeOut('slow');
        return;
    }
    var $chkval = [];
    $('.chk:checked').each(function () {
        $chkval.push($(this).val());
    });
    // alert('Chức năng cập nhật nhóm người dụng bị khóa do đây là tài khoản demo');
    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_savefunc',
        'data': {'gid': $group_id, 'listid': $chkval},
        'callback': function (data) {
            if (data == '1') {
                $('.ajax-success-ct').html('Lưu chức năng cho nhóm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
            } else if (data == '0') {
                $('.ajax-error-ct').html('Thực hiện không thành công do Nhóm không tồn tại!').parent().fadeIn().delay(1000).fadeOut('slow');
            } else {
                $('.ajax-error-ct').html('Lỗi hệ thống vui lòng liên hệ nhà cung cấp phần mềm!').parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_save_item_group($id) {
    "use strict";
    var $group_name = $('.table-group tr.edit-tr-item-' + $id + ' td.itgr_name input').val();
    if ($group_name.length == 0) {
        alert('Tên nhóm người dùng không được bỏ trống!');
    } else {
        var $data = {'gid': $id, 'group_name': $group_name};
        var $param = {
            'type': 'POST',
            'url': 'ajax/cms_save_item_group',
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    cms_upgroup();
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Thực hiện không thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

/*
 * CUSTOMER
 /***************************/
function cms_reset_valCustomer() {
    'use strict';
    $('#customer_code').val('');
    $('#customer_name').val('');
    $('#customer_phone').val('');
    $('#customer_email').val('');
    $('#customer_addr').val('');
    $('#customer_notes').val('');
    $('#customer_birthday').val('');
    $('.customer_gender').val(0);
}

function cms_reset_valSupplier() {
    'use strict';
    $('#supplier_code').val('');
    $('#supplier_name').val('');
    $('#supplier_phone').val('');
    $('#supplier_email').val('');
    $('#supplier_addr').val('');
    $('#supplier_notes').val('');
}

function cms_crCustomer() {
    "use strict";
    var $customer_group = $('#customer_group').val();
    var $code = $.trim($('#customer_code').val());
    var $name = $.trim($('#customer_name').val());
    var $customer_image = $('#customer_img_preview').text();
    var $phone = $.trim($('#customer_phone').val());
    var $mail = $.trim($('#customer_email').val());
    var $address = $('#customer_addr').val();
    var $notes = $('#customer_notes').val();
    var $birthday = $('#customer_birthday').val();
    var $gender = 0;
    var $is_customer_debt = cms_decode_currency_format($('#is_customer_debt').val());
    $('.customer_gender').each(function (index) {
        if ($(this).prop('checked') == true) {
            $gender = $(this).val();
        }
    });
    if ($name.length == 0) {
        $('.error-customer_name').text('Vui lòng nhập tên khách hàng.');
    } else {
        $('.error-group_name').text('');
        if ($phone.length != 0) {
            if (!$.isNumeric($phone)) {
                $('.error-customer_phone').text('Số điện thoại phải là số.');
                return;
            } else {
                $('.error-customer_phone').text('');
            }
        }
        var $data = {
            'data': {
                'customer_group': $customer_group,
                'customer_code': $code,
                'customer_image': $customer_image,
                'customer_name': $name,
                'customer_phone': $phone,
                'customer_email': $mail,
                'customer_addr': $address,
                'notes': $notes,
                'customer_birthday': $birthday,
                'customer_gender': $gender
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'customer/cms_crcustomer/' + $is_customer_debt,
            'data': $data,
            'callback': function (data) {
                if (data > 0) {
                    $('.btn-close').trigger('click');
                    $('.ajax-success-ct').html('Bạn đã tạo mới khách hàng thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    $("#search-box-cys").prop('readonly', true).attr('data-id', data).val($name);
                    $(".del-cys").html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
                    cms_paging_listcustomer(1);
                    cms_reset_valCustomer();
                }
                else {
                    $('.ajax-error-ct').html('Mã khách hàng đã tồn tại, Vui lòng chọn mã khác').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delCustomer($id, $page) {
    'use strict';
    var conf = confirm('Bạn chắc chắn muốn xóa khách hàng này!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'customer/cms_delCustomer',
            'data': {'id': $id},
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Lỗi! Khách hàng đã từng mua hàng không thể xóa được').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Bạn đã xóa khách hàng thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_listcustomer($page);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_save_edit_customer() {
    'use strict';
    var $ids = $('.tr-item-customer').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));
    var $customer_group = $('#d_customer_group').val();
    var $name = $.trim($('.customer-supplier #customer_name').val());
    var $customer_image = $('#edit_customer_img_preview').text();
    var $phone = $.trim($('.customer-supplier #customer_phone').val());
    var $mail = $.trim($('.customer-supplier #customer_email').val());
    var $address = $('.customer-supplier #customer_addr').val();
    var $notes = $('.customer-supplier #notes').val();
    var $birthday = $('.customer-supplier #customer_birthday').val();
    var $gender = 0;
    $('.customer-supplier .customer_gender').each(function () {
        if ($(this).prop('checked') == true) {
            $gender = $(this).val();
        }
    });
    if ($name.length == 0) {
        $('.error-customer_name').text('Tên khách hàng không được để trống.');
    } else {
        $('.error-customer_name').text('');
        if ($phone.length != 0) {
            if (!$.isNumeric($phone)) {
                $('.error-customer_phone').text('Số điện thoại phải là số.');
                return;
            } else {
                $('.error-customer_phone').text('');
            }
        }
        var $data = {
            'data': {
                'customer_group': $customer_group,
                'customer_name': $name,
                'customer_phone': $phone,
                'customer_image': $customer_image,
                'customer_email': $mail,
                'customer_addr': $address,
                'notes': $notes,
                'customer_birthday': $birthday,
                'customer_gender': $gender
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'customer/cms_save_edit_customer/' + $id,
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Bạn đã cập nhật khách hàng thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_reset_valCustomer();
                    cms_detail_after_edit($id);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_after_edit($id) {
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_detail_itemcust/' + $id,
        'data': null,
        'callback': function (data) {
            $('.customer-supplier').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_crsup() {
    $code = $.trim($('#supplier_code').val());
    $name = $.trim($('#supplier_name').val());
    $supplier_image = $('#supplier_img_preview').text();
    $phone = $.trim($('#supplier_phone').val());
    $mail = $.trim($('#supplier_email').val());
    $addr = $.trim($('#supplier_addr').val());
    $tax_code = $.trim($('#tax_code').val());
    $notes = $.trim($('#supplier_notes').val());
    $is_supplier_debt = cms_decode_currency_format($('#is_supplier_debt').val());
    if ($name.length == 0) {
        $('.error-supplier_name').text('Tên nhà cung cấp không được để trống.');
    } else {
        $('.error-supplier_name').text('');
        if ($phone.length != 0) {
            if (!$.isNumeric($phone)) {
                $('.error-supplier_phone').text('Số điện thoại phải là số.');
                return;
            } else {
                $('.error-supplier_phone').text('');
            }
        }
        var $data = {
            'data': {
                'supplier_code': $code,
                'supplier_name': $name,
                'supplier_image': $supplier_image,
                'supplier_phone': $phone,
                'supplier_email': $mail,
                'supplier_addr': $addr,
                'tax_code': $tax_code,
                'notes': $notes
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'supplier/cms_crsup/' + $is_supplier_debt,
            'data': $data,
            'callback': function (data) {
                if (data > 0) {
                    $('.btn-close').trigger('click');
                    $('.ajax-success-ct').html('Bạn đã tạo mới nhà cung cấp thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_supplier(1);
                    cms_reset_valSupplier();
                    $("#search-box-mas").prop('readonly', true).attr('data-id', data).val($name);
                    $(".del-mas").html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
                } else {
                    $('.ajax-error-ct').html('Lỗi hệ thống.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_print_order($id_template, $id_order) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_print_order',
        'data': {'data': {'id_template': $id_template, 'id_order': $id_order}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
            } else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_receipt($id_template, $id_receipt) {
    var $param = {
        'type': 'POST',
        'url': 'receipt/cms_print_receipt',
        'data': {'data': {'id_template': $id_template, 'id_receipt': $id_receipt}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
            } else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_payment($id_template, $id_payment) {
    var $param = {
        'type': 'POST',
        'url': 'payment/cms_print_payment',
        'data': {'data': {'id_template': $id_template, 'id_payment': $id_payment}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
            } else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_transfer($id_template, $id_transfer) {
    var $param = {
        'type': 'POST',
        'url': 'transfer/cms_print_transfer',
        'data': {'data': {'id_template': $id_template, 'id_transfer': $id_transfer}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
            } else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_order_in_create($id_template, $id_order) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_print_order',
        'data': {'data': {'id_template': $id_template, 'id_order': $id_order}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Lưu đơn hàng thành công!. Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
                cms_vsell_order();
            } else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                cms_vsell_order();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_transfer_in_create($id_template, $id_transfer) {
    var $param = {
        'type': 'POST',
        'url': 'transfer/cms_print_transfer',
        'data': {'data': {'id_template': $id_template, 'id_transfer': $id_transfer}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Lưu phiếu chuyển kho thành công!. Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
                cms_add_transfer();
            } else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                cms_add_transfer();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_order_in_pos($id_template, $id_order) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_print_order',
        'data': {'data': {'id_template': $id_template, 'id_order': $id_order}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Lưu đơn thành công!. Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
                location.reload();
            }
            else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                location.reload();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_input($id_template, $id_input) {
    var $param = {
        'type': 'POST',
        'url': 'input/cms_print_input',
        'data': {'data': {'id_template': $id_template, 'id_input': $id_input}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
            } else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_print_input_in_create($id_template, $id_input) {
    var $param = {
        'type': 'POST',
        'url': 'input/cms_print_input',
        'data': {'data': {'id_template': $id_template, 'id_input': $id_input}},
        'callback': function (data) {
            var mywindow = window.open('', 'In hóa đơn', 'height=800,width=1200');
            if (mywindow == null) {
                alert('Lưu phiếu nhập thành công!. Trình duyệt đã ngăn không cho phần mềm In. Vui lòng mở khóa hiển thị In ở góc phải phía trên của trình duyệt');
                cms_vsell_input();
            } else {
                mywindow.document.writeln(data);
                mywindow.document.close();
                mywindow.focus();
                mywindow.print();
                mywindow.close();
                cms_vsell_input();
                return true;
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_supplier($page) {
    $keyword = $('.txt-ssupplier').val();
    $option = $('#sup-option').val();
    $data = {'data': {'option': $option, 'keyword': $keyword}};
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_paging_supplier/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.sup-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_delsup($id, $page) {
    'use strict';
    var conf = confirm('Bạn chắc chắn muốn xóa nhà cung cấp này!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'supplier/cms_delsup',
            'data': {'id': $id},
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Lỗi! không thể xóa nhà cung cấp này').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Bạn đã xóa nhà cung cấp thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_supplier($page);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_supplier($id) {
    'use strict';
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_detail_supplier/' + $id,
        'data': null,
        'callback': function (data) {
            $('.customer-supplier').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_customer($id) {
    'use strict';
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_detail_customer/' + $id,
        'data': null,
        'callback': function (data) {
            $('.customer-supplier').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_save_edit_sup() {
    'use strict';
    var $ids = $('.tr-item-sup').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));
    var $name = $.trim($('.customer-supplier #supplier_name').val());
    var $supplier_image = $('#edit_supplier_img_preview').text();
    var $phone = $.trim($('.customer-supplier #supplier_phone').val());
    var $mail = $.trim($('.customer-supplier #supplier_email').val());
    var $address = $('.customer-supplier #supplier_addr').val();
    var $tax_code = $('.customer-supplier #tax_code').val();
    var $notes = $('.customer-supplier #notes').val();

    if ($name.length == 0) {
        $('.error-supplier_name').text('Tên Nhà cung cấp không được để trống.');
    } else {
        $('.error-supplier_name').text('');
        if ($phone.length != 0) {
            if (!$.isNumeric($phone)) {
                $('.error-supplier_phone').text('Số điện thoại phải là số.');
                return;
            } else {
                $('.error-supplier_phone').text('');
            }
        }
        var $data = {
            'data': {
                'supplier_name': $name,
                'supplier_phone': $phone,
                'supplier_image': $supplier_image,
                'supplier_email': $mail,
                'supplier_addr': $address,
                'notes': $notes,
                'tax_code': $tax_code
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'supplier/cms_save_edit_sup/' + $id,
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Bạn đã cập nhật nhà cung cấp thành công!').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_detail_supplier($id);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_select_product_input_excel($id,$quantity,$price) {
    if ($('tbody#pro_search_append tr').length != 0) {
        $flag = 0;
        $('tbody#pro_search_append tr').each(function () {
            $id_temp = $(this).attr('data-id');
            if ($id == $id_temp) {
                value_input = $(this).find('input.quantity_product_import');
                value_input.val(parseInt(value_input.val()) + $quantity);
                $flag = 1;
                return false;
            }
        });
        if ($flag == 0) {
            var $seq = parseInt($('td.seq').last().text()) + 1;
            var $param = {
                'type': 'POST',
                'url': 'input/cms_select_product_input_excel/',
                'data': {'id': $id,'quantity':$quantity,'price':$price, 'seq': $seq},
                'callback': function (data) {
                    $('#pro_search_append').append(data);
                }
            };
            cms_adapter_ajax($param);
        }
    } else {
        var $param = {
            'type': 'POST',
            'url': 'input/cms_select_product_input_excel/',
            'data': {'id': $id,'quantity':$quantity,'price':$price, 'seq': 1},
            'callback': function (data) {
                $('#pro_search_append').append(data);
            }
        };
        cms_adapter_ajax($param);
    }
}

/*
 * PRODUCT
 /***************************/
function cms_vcrproduct() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_vcrproduct',
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
            cms_product_group_show();
            cms_product_manufacture_show();
            cms_product_unit_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_create_manufacture($cont) {
    'user strict';
    var $prd_manuf_name = $.trim($('#prd_manuf_name').val());
    if ($prd_manuf_name.length == 0) {
        alert('Nhập tên Nhà sản xuất sản phẩm.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_create_manufacture',
            'data': {'data': {'prd_manuf_name': $prd_manuf_name}},
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_manufacture(1);
                    cms_load_listmanufacture();
                    $('.ajax-success-ct').html('Tạo nhà sản xuất thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    $('#prd_manuf_name').val('');
                    if ($cont == 1)
                        $('.btn-close').trigger('click');
                } else {
                    $('.ajax-error-ct').html('Tên Nhà sản xuất đã có trong hệ thống. Vui lòng chọn tên khác.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_create_unit($cont) {
    'user strict';
    var $prd_unit_name = $.trim($('#prd_unit_name').val());
    if ($prd_unit_name.length == 0) {
        alert('Nhập tên đơn vị tính sản phẩm.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_create_unit',
            'data': {'data': {'prd_unit_name': $prd_unit_name}},
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_unit(1);
                    cms_load_listunit();
                    $('.ajax-success-ct').html('Tạo đơn vị tính thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    $('#prd_unit_name').val('');
                    if ($cont == 1)
                        $('.btn-close').trigger('click');
                } else {
                    $('.ajax-error-ct').html('Tên đơn vị tính đã có trong hệ thống. Vui lòng chọn tên khác.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_paging_manufacture($page) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_paging_manufacture/' + $page,
        'data': null,
        'callback': function (data) {
            $('.prd_manufacture-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_unit($page) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_paging_unit/' + $page,
        'data': null,
        'callback': function (data) {
            $('.prd_unit-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_delete_manufacture($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa Nhà sản xuất sản phẩm này!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_manufacture/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Lỗi! không thể xóa Nhà sản xuất sản phẩm này').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Xóa nhà sản xuất thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_manufacture($page);
                    cms_load_listmanufacture();
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delete_unit($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa đơn vị tính sản phẩm này!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_unit/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Lỗi! không thể xóa đơn vị tính sản phẩm này').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Xóa đơn vị tính thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_unit($page);
                    cms_load_listunit();
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delete_receipt_in_order($order_id, $receipt_id) {
    var conf = confirm('Bạn chắc chắn muốn xóa phiếu nhập này!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_delete_receipt_in_order/' + $receipt_id,
            'data': null,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Lỗi! không thể xóa phiếu thu này').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Xóa phiếu thu thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_detail_order($order_id);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delete_payment_in_input($input_id, $payment_id) {
    var conf = confirm('Bạn chắc chắn muốn xóa phiếu nhập này!');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'input/cms_delete_payment_in_input/' + $payment_id,
            'data': null,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Lỗi! không thể xóa phiếu chi này').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Xóa phiếu chi thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_detail_input($input_id);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_prdmanufacture($id) {
    'use strict';
    var $prd_manuf_name = $.trim($('.edit_prd_manuf_name-' + $id).val());
    if ($prd_manuf_name.length == 0) {
        alert('Nhập tên Nhà sản xuất sản phẩm.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_update_prdmanufacture/' + $id,
            'data': {'data': {'prd_manuf_name': $prd_manuf_name}},
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_manufacture(1);
                    cms_load_listgroup();
                    $('.ajax-success-ct').html('Cập nhật Nhà sản xuất sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html('Tên Nhà sản xuất đã có trong hệ thống. Vui lòng chọn tên khác.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_prdunit($id) {
    'use strict';
    var $prd_unit_name = $.trim($('.edit_prd_unit_name-' + $id).val());
    if ($prd_unit_name.length == 0) {
        alert('Nhập tên đơn vị tính sản phẩm.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_update_prdunit/' + $id,
            'data': {'data': {'prd_unit_name': $prd_unit_name}},
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_unit(1);
                    cms_load_listunit();
                    $('.ajax-success-ct').html('Cập nhật đơn vị tính sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html('Tên đơn vị tính đã có trong hệ thống. Vui lòng chọn tên khác.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_create_group($cont) {
    'use strict';
    var $prd_group_name = $.trim($('#prd_group_name').val());
    var $parentid = $('#parentid').val();
    var $data = {'data': {'prd_group_name': $prd_group_name, 'parentid': $parentid}};
    if ($prd_group_name.length == 0) {
        alert('Nhập tên danh mục.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_create_group',
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_group(1);
                    cms_load_listgroup();
                    $('.ajax-success-ct').html('Tạo danh mục thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    $('#prd_group_name').val('');
                    $('#parentid').val('');
                    if ($cont == 1)
                        $('.btn-close').trigger('click');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Tên danh mục cùng cấp đã tồn tại trong hệ thống. Vui lòng chọn tên khác.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html('Opps! Something went wrong. please try again!').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_load_listgroup() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_load_listgroup',
        'data': null,
        'callback': function (data) {
            $('#prd_group_id').html(data);
            cms_load_listgroup_withoutCreate();
            cms_product_group_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_load_listgroup_withoutCreate() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_load_listgroup_withoutCreate',
        'data': null,
        'callback': function (data) {
            $('#parentid').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_load_listmanufacture() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_load_listmanufacture',
        'data': null,
        'callback': function (data) {
            $('#prd_manufacture_id').html(data);
            cms_product_manufacture_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_load_listunit() {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_load_listunit',
        'data': null,
        'callback': function (data) {
            $('#prd_unit_id').html(data);
            cms_product_unit_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_save_item_prdGroup($id) {
    'use strict';
    var $prd_group_name = $.trim($('.edit_prd_group_name-' + $id).val());
    if ($prd_group_name.length == 0) {
        alert('Nhập tên danh mục sản phẩm.');
    } else {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_save_item_prdGroup/' + $id,
            'data': {'data': {'prd_group_name': $prd_group_name}},
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_group(1);
                    cms_load_listgroup();
                    $('.ajax-success-ct').html('Cập nhật danh mục thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-error-ct').html('Tên danh mục đã có trong hệ thống. Vui lòng chọn tên khác.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delete_Group($id, $page) {
    'use strict';
    var conf = confirm('Bạn chắc chắn muốn xóa danh mục này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_Group/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_group($page);
                    $('.ajax-success-ct').html('Xóa danh mục thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_load_listgroup();
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '2') {
                    if (confirm('Danh mục này đã có chứa sản phẩm, Bạn có chắc chắn muốn xóa?')) {
                        var $param = {
                            'type': 'POST',
                            'url': 'product/cms_delete_Group_WithProduct/' + $id,
                            'data': null,
                            'callback': function (data) {
                                if (data == '1') {
                                    cms_paging_group($page);
                                    cms_load_listgroup();
                                    $('.ajax-success-ct').html('Xóa danh mục thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                                } else {
                                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                                }
                            }
                        };
                        cms_adapter_ajax($param);
                    }
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_add_product(type) {
    'use strict';
    var $code = $.trim($('#prd_code').val());
    var $name = $.trim($('#prd_name').val());
    var $prd_image_url = $('#img_preview').text();
    var $sls = $.trim($('#prd_sls').val());
    var $inventory = cms_get_valCheckbox('prd_inventory', 'id');
    var $allownegative = cms_get_valCheckbox('prd_allownegative', 'id');
    var $origin_price = cms_decode_currency_format($('#prd_origin_price').val());
    var $infor = $('#infor').val();
    var $sell_price = cms_decode_currency_format($('#prd_sell_price').val());
    var $sell_price2 = cms_decode_currency_format($('#prd_sell_price2').val());
    var $group_id = $('#prd_group_id').val();
    var $manufacture_id = $('#prd_manufacture_id').val();
    var $unit_id = $('#prd_unit_id').val();
    var $vat = $('#prd_vat').val();
    var $display_wb = cms_get_valCheckbox('display_website', 'id');
    var $new = cms_get_valCheckbox('prd_new', 'id');
    var $hot = cms_get_valCheckbox('prd_hot', 'id');
    var $highlight = cms_get_valCheckbox('prd_highlight', 'id');
    if ($name.length == 0) {
        $('.ajax-error-ct').html('Vui lòng nhập tên sản phẩm.').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        var $data = {
            'data': {
                'prd_name': $name,
                'prd_code': $code,
                'prd_sls': $sls,
                'prd_image_url': $prd_image_url,
                'prd_inventory': $inventory,
                'prd_allownegative': $allownegative,
                'infor': $infor,
                'prd_origin_price': $origin_price == '' ? 0 : $origin_price,
                'prd_sell_price': $sell_price,
                'prd_sell_price2': $sell_price2,
                'prd_group_id': $group_id,
                'prd_manufacture_id': $manufacture_id,
                'prd_unit_id': $unit_id,
                'prd_vat': $vat,
                                'display_website': $display_wb,
                'prd_new': $new,
                'prd_hot': $hot,
                'prd_highlight': $highlight
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'product/cms_add_product/',
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    if (type == 'save') {
                        $('.ajax-success-ct').html('Tạo sản phẩm ' + $name + ' thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                        setTimeout(function () {
                            $('.btn-back').trigger('click');
                        }, 2000);
                    } else {
                        $('.ajax-success-ct').html('Tạo sản phẩm ' + $name + ' thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                        $('.products').find('input:text').val('');
                        $('.products').find('input:checkbox').prop('checked', false);
                    }
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_product($id) {
    'use strict';
    var $name = $.trim($('#prd_name').val());
    var $code = $.trim($('#prd_code').val());
    var $inventory = cms_get_valCheckbox('prd_inventory', 'id');
    var $allownegative = cms_get_valCheckbox('prd_allownegative', 'id');
    var $prd_image_url = $('#img_preview').text();
    var $infor = $('#infor').val();
    var $origin_price = cms_decode_currency_format($('#prd_origin_price').val());
    var $sell_price = cms_decode_currency_format($('#prd_sell_price').val());
    var $sell_price2 = cms_decode_currency_format($('#prd_sell_price2').val());
    var $group_id = $('#prd_group_id').val();
    var $manufacture_id = $('#prd_manufacture_id').val();
    var $unit_id = $('#prd_unit_id').val();
    var $description = CKEDITOR.instances['ckeditor'].getData();
    var $display_wb = cms_get_valCheckbox('display_website', 'id');
    var $new = cms_get_valCheckbox('prd_new', 'id');
    var $hot = cms_get_valCheckbox('prd_hot', 'id');
    var $highlight = cms_get_valCheckbox('prd_highlight', 'id');
    if ($name.length == 0) {
        $('.ajax-error-ct').html('Vui lòng nhập tên sản phẩm.').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        var $data = {
            'data': {
                'prd_code': $code,
                'prd_name': $name,
                'prd_inventory': $inventory,
                'prd_allownegative': $allownegative,
                'prd_origin_price': $origin_price,
                'infor': $infor,
                'prd_sell_price': $sell_price,
                'prd_sell_price2': $sell_price2,
                'prd_group_id': $group_id,
                'prd_manufacture_id': $manufacture_id,
                'prd_unit_id': $unit_id,
                'prd_image_url': $prd_image_url,
                'prd_descriptions': $description,
                'display_website': $display_wb,
                'prd_new': $new,
                'prd_hot': $hot,
                'prd_highlight': $highlight
            }
        };
        var $param = {
            'type': 'POST',
            'url': 'product/cms_update_product/' + $id,
            'data': $data,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Cập nhật sản phẩm ' + $name + ' thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').trigger('click');
                    }, 2000);
                } else {
                    $('.ajax-error-ct').html(data).parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_paging_listcustomer($page) {
    $keyword = $('.txt-scustomer').val();
    $option = $('#cus-option').val();
    $data = {'data': {'option': $option, 'keyword': $keyword}};
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_paging_listcustomer/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.cus-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_delete_product($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa sản phẩm này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_product/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Xóa sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_product($page);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_delete_product_bydetail($id) {
    var conf = confirm('Bạn chắc chắn muốn xóa sản phẩm này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_delete_product/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Xóa sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_accept_transfer($id) {
    var conf = confirm('Bạn có chắc chắn muốn xác nhận nhập kho?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'transfer/cms_accept_transfer/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Xác nhận nhập kho thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_restore_product_deleted_bydetail($id) {
    var conf = confirm('Bạn chắc chắn muốn khôi phục sản phẩm này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_restore_product_deleted/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Khôi phục sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_restore_product_deleted($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn khôi phục sản phẩm này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_restore_product_deleted/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Khôi phục sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_product($page);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_restore_product_deactivated_bydetail($id) {
    var conf = confirm('Bạn chắc chắn muốn khôi phục sản phẩm này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_restore_product_deactivated/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Khôi phục sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_restore_product_deactivated($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn khôi phục sản phẩm này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_restore_product_deactivated/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Khôi phục sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_product($page);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_deactivate_product($id, $page) {
    var conf = confirm('Bạn có thực sự muốn ngừng kinh doanh sản phẩm này không?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'product/cms_deactivate_product/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Ngừng kinh doanh sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    cms_paging_product($page);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_deactivate_product_bydetail($id) {
    var conf = confirm('Bạn có thực sự muốn ngừng kinh doanh sản phẩm này không?');
    if (conf) {
        var $name = $('td.prd_name').text();
        var $param = {
            'type': 'POST',
            'url': 'product/cms_deactivate_product/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    $('.ajax-success-ct').html('Ngừng kinh doanh sản phẩm thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_javascript_redirect(cms_javascrip_fullURL());
                    }, 2000);
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_product($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_detail_product/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_product_deleted($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_detail_product_deleted/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_product_deactivated($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_detail_product_deactivated/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_clone_product($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_clone_product/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
            cms_product_group_show();
            cms_product_manufacture_show();
            cms_product_unit_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_edit_product($id) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_edit_product/' + $id,
        'data': null,
        'callback': function (data) {
            $('.products').html(data);
            cms_product_group_show();
            cms_product_unit_show();
            cms_product_manufacture_show();
        }
    };
    cms_adapter_ajax($param);
}

function cms_edit_payment($id, $page) {
    var $param = {
        'type': 'POST',
        'url': 'payment/cms_edit_payment/' + $id + '/' + $page,
        'data': null,
        'callback': function (data) {
            $('#update_payment_content').html(data);
            $('#update-payment').modal('show');
        }
    };
    cms_adapter_ajax($param);
}

function cms_edit_receipt($id, $page) {
    var $param = {
        'type': 'POST',
        'url': 'receipt/cms_edit_receipt/' + $id + '/' + $page,
        'data': null,
        'callback': function (data) {
            $('#update_receipt_content').html(data);
            $('#update-receipt').modal('show');
        }
    };
    cms_adapter_ajax($param);
}

/*========================== ORDER ============================*/

function cms_vsell_order() {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_vsell_order/',
        'data': null,
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_return_order($id) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_return_order/' + $id,
        'data': null,
        'callback': function (data) {
            $('.orders').html(data);
            cms_load_infor_order_return();
        }
    };
    cms_adapter_ajax($param);
}

function cms_return_input($id) {
    var $param = {
        'type': 'POST',
        'url': 'input/cms_return_input/' + $id,
        'data': null,
        'callback': function (data) {
            $('.orders').html(data);
            cms_load_infor_order();
        }
    };
    cms_adapter_ajax($param);
}

function cms_add_transfer() {
    var $param = {
        'type': 'POST',
        'url': 'transfer/cms_add_transfer/',
        'data': null,
        'callback': function (data) {
            $('.transfer').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_product_search() {
    $("body").on('keyup', '#product-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_product(1);
        }
    });
}

function cms_change_store() {
    $('#store-id').on('change', function () {
        var store_id = $("#store-id").val();
        var $param = {
            'type': 'POST',
            'url': 'account/cms_change_store/' + store_id,
            'callback': function (data) {
                if (data == '1') {

                }
            }
        };
        cms_adapter_ajax($param);
        var link = window.location.pathname;
        if (link.indexOf('transfer') !== -1) {
            resetAutocomplete_transfer();
        }
        else if (link.indexOf('pos') !== -1) {
            resetAutocomplete_order();
        }
        else if (link.indexOf('orders') !== -1) {
            resetAutocomplete_order();

            if ($('#search-option-1').val() >= 0)
                cms_paging_order(1);
        }
        else if (link.indexOf('product') !== -1) {
            if ($('#search-option-1').val() >= 0)
                cms_paging_order(1);
        }
        else if (link.indexOf('inventory') !== -1) {
            if ($('#option_inventory').val() >= 0)
                cms_paging_inventory(1);
        }
        else if (link.indexOf('import') !== -1) {
            if ($('#search-option-1').val() >= 0)
                cms_paging_order(1);
        }
    });
}

function cms_input_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_input(1);
    });

    $("body").on('keyup', '#input-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_input(1);
        }
    });
}

function cms_order_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_order(1);
    });

    $("body").on('keyup', '#order-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_order(1);
        }
    });
}

function cms_debt_search() {
    $('#store_id').on('change', function () {
        cms_paging_debt(1);
    });

    $("body").on('keyup', '#order-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_debt(1);
        }
    });
}

function cms_transfer_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_transfer(1);
    });

    $("body").on('keyup', '#transfer-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_transfer(1);
        }
    });
}

function cms_payment_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_payment(1);
    });

    $("body").on('keyup', '#payment-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_payment(1);
        }
    });
}

function cms_receipt_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_receipt(1);
    });

    $("body").on('keyup', '#receipt-search', function (e) {
        if (e.keyCode == 13) {
            cms_paging_receipt(1);
        }
    });
}

function cms_revenue_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_revenue(1);
    });
    $('#search-option-2').on('change', function () {
        cms_paging_revenue(1);
    });
    $('#search-option-3').on('change', function () {
        cms_paging_revenue(1);
    });
    $('#search-option-4').on('change', function () {
        cms_paging_revenue(1);
    });
    $('[name=revenue]').on('change', function () {
        cms_paging_revenue(1);
    });
}

function cms_profit_search() {
    $('#search-option-1').on('change', function () {
        cms_paging_profit(1);
    });
    $('#search-option-2').on('change', function () {
        cms_paging_profit(1);
    });
    $('#search-option-3').on('change', function () {
        cms_paging_profit(1);
    });
    $('#search-option-4').on('change', function () {
        cms_paging_profit(1);
    });
    $('[name=profit]').on('change', function () {
        cms_paging_profit(1);
    });
}

function cms_group_change() {
    var $group_id = $('div.group-user .group-radio input:checked').val();
    cms_select_group_upfunc($group_id);
}

function cms_autocomplete_enter_order_return() {
    $barcode = $("#search-pro-box").val();
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_check_barcode/' + $barcode,
        'data': null,
        'callback': function (data) {
            if (data > 0) {
                cms_select_product_order_return(data);
                $(this).val('');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_autocomplete_enter_sell() {
    $barcode = $("#search-pro-box").val();
    $customer_id = typeof $('#search-box-cys').attr('data-id') === 'undefined' ? 0 : $('#search-box-cys').attr('data-id');
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_check_barcode/' + $barcode,
        'data': null,
        'callback': function (data) {
            if (data > 0) {
                cms_select_product_sell(data, $customer_id);
                $(this).val('');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_autocomplete_enter_transfer() {
    $barcode = $("#search-pro-box").val();
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_check_barcode/' + $barcode,
        'data': null,
        'callback': function (data) {
            if (data > 0) {
                cms_select_product_transfer(data);
                $(this).val('');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_autocomplete_enter_sell_gift() {
    $barcode = $("#search-pro-box-gift").val();
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_check_barcode/' + $barcode,
        'data': null,
        'callback': function (data) {
            if (data > 0) {
                cms_select_product_sell_gift(data);
                $(this).val('');
            }
        }
    };
    cms_adapter_ajax($param);
}


function cms_autocomplete_enter_import() {
    $barcode = $("#search-pro-box").val();
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_check_barcode/' + $barcode,
        'data': null,
        'callback': function (data) {
            if (data > 0) {
                cms_select_product_import(data);
                $(this).val('');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_inventory_search() {
    $("body").on('keyup', '.txt-sinventory', function (e) {
        if (e.keyCode == 13) {
            cms_paging_inventory(1);
        }
    });
}

function cms_customer_search() {
    $("body").on('keyup', '.txt-scustomer', function (e) {
        if (e.keyCode == 13) {
            cms_paging_listcustomer(1);
        }
    });
}

function cms_supplier_search() {
    $("body").on('keyup', '.txt-ssupplier', function (e) {
        if (e.keyCode == 13) {
            cms_paging_supplier(1);
        }
    });
}

function cms_product_group_show() {
    $('#prd_group_id').change(function () { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_group") { //Compare it and if true
            $('#list-prd-group').modal("show"); //Open Modal
        }
    });
}

function cms_product_manufacture_show() {
    $('#prd_manufacture_id').change(function () { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_manufacture") { //Compare it and if true
            $('#list-prd-manufacture').modal("show"); //Open Modal
        }
    });
}

function cms_product_unit_show() {
    $('#prd_unit_id').change(function () { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_unit") { //Compare it and if true
            $('#list-prd-unit').modal("show"); //Open Modal
        }
    });
}

function cms_search_box_customer() {
    $("body").on('keyup ajaxComplete', '#search-box-cys', function () {
        $('#cys-suggestion-box').show();
        $key = $(this).val();
        if ($key.length == 0) {
            $('.search-cys-inner').html('Không có kết quả phù hợp').parent().hide().delay(1000);
        } else {
            var $param = {
                'type': 'POST',
                'url': 'orders/cms_search_box_customer/',
                'data': {'data': {'keyword': $key}},
                'callback': function (data) {
                    if (data.length != 0) {
                        $('.search-cys-inner').html(data);
                    } else {
                        $('.search-cys-inner').html('Không có kết quả phù hợp');
                    }
                }
            };
            cms_adapter_ajax($param);
        }
    });
}

function cms_search_box_sup() {
    $("body").on('keyup ajaxComplete', '#search-box-mas', function () {
        $('#mas-suggestion-box').show();
        $keyword = $(this).val();
        if ($keyword.length == 0) {
            $('.search-mas-inner').html('Không có kết quả phù hợp').parent().hide().delay(1000);
        } else {

            var $param = {
                'type': 'POST',
                'url': 'input/cms_search_box_sup/' + $keyword,
                'data': null,
                'callback': function (data) {
                    if (data.length != 0) {
                        $('.search-mas-inner').html(data);
                    } else {
                        $('.search-mas-inner').html('Không có kết quả phù hợp');
                    }
                }
            };
            cms_adapter_ajax($param);
        }
    });
}

function cms_select_product_sell($id, $customer_id) {
    if ($('tbody#pro_search_append tr').length != 0) {
        $flag = 0;
        $('tbody#pro_search_append tr').each(function () {
            $id_temp = $(this).attr('data-id');
            if ($id == $id_temp) {
                value_input = $(this).find('input.quantity_product_order');
                value_input.val(parseInt(value_input.val()) + 1);
                $flag = 1;
                cms_load_infor_order();
                return false;
            }
        });
        if ($flag == 0) {
            var $seq = parseInt($('td.seq').last().text()) + 1;
            var $param = {
                'type': 'POST',
                'url': 'orders/cms_select_product/' + $customer_id,
                'data': {'id': $id, 'seq': $seq},
                'callback': function (data) {
                    $('#pro_search_append').append(data);
                    cms_load_infor_order();
                }
            };
            cms_adapter_ajax($param);
        }
    } else {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_select_product/' + $customer_id,
            'data': {'id': $id, 'seq': 1},
            'callback': function (data) {
                $('#pro_search_append').append(data);
                cms_load_infor_order();
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_select_product_sell_gift($id) {
    if ($('tbody#pro_gift_search_append tr').length != 0) {
        $flag = 0;
        $('tbody#pro_gift_search_append tr').each(function () {
            $id_temp = $(this).attr('data-id');
            if ($id == $id_temp) {
                value_input = $(this).find('input.quantity_product_order');
                value_input.val(parseInt(value_input.val()) + 1);
                $flag = 1;
                cms_load_infor_order();
                return false;
            }
        });
        if ($flag == 0) {
            var $seq = parseInt($('td.seq').last().text()) + 1;
            var $param = {
                'type': 'POST',
                'url': 'orders/cms_select_product_gift/',
                'data': {'id': $id, 'seq': $seq},
                'callback': function (data) {
                    $('#pro_gift_search_append').append(data);
                    cms_load_infor_order();
                }
            };
            cms_adapter_ajax($param);
        }
    } else {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_select_product_gift/',
            'data': {'id': $id, 'seq': 1},
            'callback': function (data) {
                $('#pro_gift_search_append').append(data);
                cms_load_infor_order();
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_select_product_order_return($id) {
    if ($('tbody#product_sell tr').length != 0) {
        $flag = 0;
        $('tbody#product_sell tr').each(function () {
            $id_temp = $(this).attr('data-id');
            if ($id == $id_temp) {
                value_input = $(this).find('input.quantity_sell');
                value_input.val(parseInt(value_input.val()) + 1);
                $flag = 1;
                cms_load_infor_order_return();
                return false;
            }
        });
        if ($flag == 0) {
            var $seq = parseInt($('td.seq').last().text()) + 1;
            var $param = {
                'type': 'POST',
                'url': 'orders/cms_select_product_order_return/',
                'data': {'id': $id, 'seq': $seq},
                'callback': function (data) {
                    $('#product_sell').append(data);
                    cms_load_infor_order_return();
                }
            };
            cms_adapter_ajax($param);
        }
    } else {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_select_product_order_return/',
            'data': {'id': $id, 'seq': 1},
            'callback': function (data) {
                $('#product_sell').append(data);
                cms_load_infor_order_return();
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_select_product_transfer($id) {
    if ($('tbody#pro_search_append tr').length != 0) {
        $flag = 0;
        $('tbody#pro_search_append tr').each(function () {
            $id_temp = $(this).attr('data-id');
            if ($id == $id_temp) {
                value_input = $(this).find('input.quantity_product_order');
                value_input.val(parseInt(value_input.val()) + 1);
                $flag = 1;
                return false;
            }
        });
        if ($flag == 0) {
            var $seq = parseInt($('td.seq').last().text()) + 1;
            var $param = {
                'type': 'POST',
                'url': 'transfer/cms_select_product/',
                'data': {'id': $id, 'seq': $seq},
                'callback': function (data) {
                    $('#pro_search_append').append(data);
                }
            };
            cms_adapter_ajax($param);
        }
    } else {
        var $param = {
            'type': 'POST',
            'url': 'transfer/cms_select_product/',
            'data': {'id': $id, 'seq': 1},
            'callback': function (data) {
                $('#pro_search_append').append(data);
            }
        };
        cms_adapter_ajax($param);
    }
}



function cms_select_product_import($id) {
    if ($('tbody#pro_search_append tr').length != 0) {
        $flag = 0;
        $('tbody#pro_search_append tr').each(function () {
            $id_temp = $(this).attr('data-id');
            if ($id == $id_temp) {
                value_input = $(this).find('input.quantity_product_import');
                value_input.val(parseInt(value_input.val()) + 1);
                $flag = 1;
                cms_load_infor_import();
                return false;
            }
        });
        if ($flag == 0) {
            var $seq = parseInt($('td.seq').last().text()) + 1;
            var $param = {
                'type': 'POST',
                'url': 'input/cms_select_product/',
                'data': {'id': $id, 'seq': $seq},
                'callback': function (data) {
                    $('#pro_search_append').append(data);
                    cms_load_infor_import();
                }
            };
            cms_adapter_ajax($param);
        }
    } else {
        var $param = {
            'type': 'POST',
            'url': 'input/cms_select_product/',
            'data': {'id': $id, 'seq': 1},
            'callback': function (data) {
                $('#pro_search_append').append(data);
                cms_load_infor_import();
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_selected_cys($id) {
    $name = $('li.data-cys-name-' + $id).text();
    $("#search-box-cys").prop('readonly', true).attr('data-id', $id).val($name);
    $(".del-cys").html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
    $('#cys-suggestion-box').hide();
    resetAutocomplete_order();
}

function cms_selected_mas($id) {
    $name = $('li.data-cys-name-' + $id).text();
    $("#search-box-mas").prop('readonly', true).attr('data-id', $id).val($name);
    $(".del-mas").html('<i class="fa fa-minus-circle" aria-hidden="true"></i>');
    $('#mas-suggestion-box').hide();
}

function cms_save_orders(type) {
    if ($('tbody#pro_search_append tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui lòng chọn ít nhất 1 sản phẩm cần xuất trước khi lưu đơn hàng. Xin cảm ơn!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $customer_id = typeof $('#search-box-cys').attr('data-id') === 'undefined' ? 0 : $('#search-box-cys').attr('data-id');
        $store_id = $('#store-id').val();
        $date = $('#date-order').val();
        $note = $('#note-order').val();
        $vat = $('#vat').val();
        $sale_id = $('#sale_id').val() === null ? 0 : $('#sale_id').val();
        $payment_method = $("input:radio[name ='method-pay']:checked").val();
        $discount = cms_decode_currency_format($('input.discount-order').val());
        $discount_item = cms_decode_currency_format($('input.discount-item').val());
        $customer_pay = cms_decode_currency_format($('.customer-pay').val());
        $detail = [];
        $('tbody#pro_search_append  tr').each(function () {
            $id = $(this).attr('data-id');
            $quantity = $(this).find('input.quantity_product_order').val();
            $notes = $(this).find('input.note_product_order').val();
            $price = cms_decode_currency_format($(this).find('input.price-order').val());
            $detail.push(
                {id: $id, quantity: $quantity, price: $price, discount: 0, note: $notes}
            );
        });

        $('tbody#pro_gift_search_append  tr').each(function () {
            $id = $(this).attr('data-id');
            $quantity = $(this).find('input.quantity_product_order').val();
            $notes = $(this).find('input.note_product_order').val();
            $detail.push(
                {id: $id, quantity: $quantity, price: 0, discount: 0, note: $notes}
            );
        });

        if (type == "0")
            $order_status = 0;
        else
            $order_status = 1;

        $data = {
            'data': {
                'sale_id': $sale_id,
                'vat': $vat,
                'customer_id': $customer_id,
                'sell_date': $date,
                'notes': $note,
                'payment_method': $payment_method,
                'discount_item': $discount_item,
                'coupon': $discount,
                'customer_pay': $customer_pay,
                'detail_order': $detail,
                'order_status': $order_status
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'orders/cms_save_orders/' + $store_id,
            'data': $data,
            'callback': function (data) {
                if (isNaN(parseInt(data))) {
                    $('.ajax-error-ct').html('Không đủ hàng tồn. ' + data).parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '-1') {
                    $('.ajax-error-ct').html('Vui lòng chọn khách hàng để có thể bán nợ').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    if (type == 1) {
                        $('.ajax-success-ct').html('Đã lưu thành công đơn hàng.').parent().fadeIn().delay(1000).fadeOut('slow');
                        setTimeout(function () {
                            $('.btn-back').delay('1000').trigger('click');
                        }, 1000);
                    } else if (type == 0) {
                        $('.ajax-success-ct').html('Đã khởi tạo thành công đơn hàng.').parent().fadeIn().delay(1000).fadeOut('slow');
                        cms_vsell_order();
                    } else if (type == 2) {
                        cms_print_order_in_create(1, data);
                    } else if (type == 3) {
                        $('.ajax-success-ct').html('Đã lưu thành công đơn hàng.').parent().fadeIn().delay(1000).fadeOut('slow');
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } else if (type == 4) {
                        cms_print_order_in_pos(1, data);
                    }
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function resetAutocomplete_order() {
    $customer_id = (typeof $('#search-box-cys').attr('data-id') === 'undefined' ? 0 : $('#search-box-cys').attr('data-id'));
    $store_id = $('#store-id').val();
    $("#search-pro-box").autocomplete("destroy");
    $(function () {
        $("#search-pro-box").autocomplete({
            minLength: 1,
            source: 'orders/cms_autocomplete_products/' + $customer_id + '/' + $store_id,
            focus: function (event, ui) {
                $("#search-pro-box").val(ui.item.prd_code);
                return false;
            },
            select: function (event, ui) {
                cms_select_product_sell(ui.item.ID,$customer_id);
                $("#search-pro-box").val('');
                return false;
            }
        }).keyup(function (e) {
            if (e.which === 13) {
                cms_autocomplete_enter_sell();
                $("#search-pro-box").val('');
                $(".ui-menu-item").hide();
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<div>" + item.prd_code + " - " + item.prd_name + " - " + item.prd_sell_price + " - Tồn: "+ item.quantity + "</div>")
                .appendTo(ul);
        };
    });

    $("#search-pro-box-gift").autocomplete("destroy");
    $("#search-pro-box-gift").autocomplete({
        minLength: 1,
        source: 'orders/cms_autocomplete_products/' + $customer_id + '/' + $store_id,
        focus: function (event, ui) {
            $("#search-pro-box-gift").val(ui.item.prd_code);
            return false;
        },
        select: function (event, ui) {
            cms_select_product_sell_gift(ui.item.ID);
            $("#search-pro-box-gift").val('');
            return false;
        }
    }).keyup(function (e) {
        if (e.which === 13) {
            cms_autocomplete_enter_sell_gift();
            $("#search-pro-box-gift").val('');
            $(".ui-menu-item").hide();
        }
    })
        .autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
            .append("<div>" + item.prd_code + " - " + item.prd_name + " - " + item.prd_sell_price + " - Tồn: "+ item.quantity + "</div>")
            .appendTo(ul);
    };
}

function resetAutocomplete_transfer() {
    $store_id = $('#store-id').val();
    $("#search-pro-box").autocomplete("destroy");

    $(function () {
        $("#search-pro-box").autocomplete({
            minLength: 1,
            source: 'orders/cms_autocomplete_products/'+0+'/'+$store_id,
            focus: function (event, ui) {
                $("#search-pro-box").val(ui.item.prd_code);
                return false;
            },
            select: function (event, ui) {
                cms_select_product_transfer(ui.item.ID);
                $("#search-pro-box").val('');
                return false;
            }
        }).keyup(function (e) {
            if (e.which === 13) {
                cms_select_product_transfer();
                $("#search-pro-box").val('');
                $(".ui-menu-item").hide();
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<div>" + item.prd_code + " - " + item.prd_name  + " - Tồn: "+ item.quantity + "</div>")
                .appendTo(ul);
        };
    });
}

function cms_save_input_return($type, $input_id) {
    if ($('tbody#pro_search_append tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui lòng chọn ít nhất 1 sản phẩm cần xuất trước khi lưu đơn hàng xuất trả. Xin cảm ơn!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $store_id = $('#store-id').val();
        $date = $('#date-order').val();
        $note = $('#note-order').val();
        $payment_method = $("input:radio[name ='method-pay']:checked").val();
        $discount = cms_decode_currency_format($('input.discount-order').val());
        $customer_pay = cms_decode_currency_format($('.customer-pay').val());
        $detail = [];
        $('tbody#pro_search_append  tr').each(function () {
            $id = $(this).attr('data-id');
            $price = cms_decode_currency_format($(this).find('input.price-order').val());
            $quantity = $(this).find('input.quantity_product_order').val();
            $detail.push(
                {id: $id, quantity: $quantity, price: $price, discount: 0}
            );
        });

        $data = {
            'data': {
                'input_id': $input_id,
                'sell_date': $date,
                'notes': $note,
                'payment_method': $payment_method,
                'coupon': $discount,
                'customer_pay': $customer_pay,
                'detail_order': $detail,
                'order_status': 1
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'input/cms_save_input_return/' + $store_id,
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    if ($type == 1) {
                        $('.ajax-success-ct').html('Đã lưu thành công đơn hàng.').parent().fadeIn().delay(1000).fadeOut('slow');
                        setTimeout(function () {
                            $('.btn-back').delay('1000').trigger('click');
                        }, 1000);
                    } else {
                        cms_print_order_in_create(1, data);
                    }
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_orders(order_id, type) {
    if ($('tbody#pro_search_append tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui lòng chọn ít nhất 1 sản phẩm cần xuất trước khi lưu đơn hàng. Xin cảm ơn!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $customer_id = typeof $('#search-box-cys').attr('data-id') === 'undefined' ? 0 : $('#search-box-cys').attr('data-id');
        $date = $('#date-order').val();
        $vat = $('#vat').val();
        $note = $('#note-order').val();
        $sale_id = $('#sale_id').val();
        $payment_method = $("input:radio[name ='method-pay']:checked").val();
        $discount_item = cms_decode_currency_format($('input.discount-item').val());
        $discount = cms_decode_currency_format($('input.discount-order').val());
        $customer_pay = cms_decode_currency_format($('.customer-pay').val());
        $detail = [];
        $('tbody#pro_search_append  tr').each(function () {
            $id = $(this).attr('data-id');
            $quantity = $(this).find('input.quantity_product_order').val();
            $notes = $(this).find('input.note_product_order').val();
            $price = cms_decode_currency_format($(this).find('input.price-order').val());
            $detail.push(
                {id: $id, quantity: $quantity, price: $price, discount: 0, note: $notes}
            );
        });

        $('tbody#pro_gift_search_append  tr').each(function () {
            $id = $(this).attr('data-id');
            $quantity = $(this).find('input.quantity_product_order').val();
            $notes = $(this).find('input.note_product_order').val();
            $detail.push(
                {id: $id, quantity: $quantity, price: 0, discount: 0, note: $notes}
            );
        });

        $data = {
            'data': {
                'sale_id': $sale_id,
                'customer_id': $customer_id,
                'sell_date': $date,
                'vat': $vat,
                'notes': $note,
                'payment_method': $payment_method,
                'discount_item': $discount_item,
                'coupon': $discount,
                'customer_pay': $customer_pay,
                'detail_order': $detail,
                'order_status': type
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'orders/cms_update_orders/' + order_id,
            'data': $data,
            'callback': function (data) {
                if (isNaN(parseInt(data))) {
                    $('.ajax-error-ct').html('Không đủ hàng tồn. ' + data).parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-success-ct').html('Đã lưu thông tin thành công').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').delay('1000').trigger('click');
                    }, 1000);
                } else if (data == '-1') {
                    $('.ajax-error-ct').html('Vui lòng chọn khách hàng để có thể bán nợ').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (type == '6') {
                    $('.ajax-success-ct').html('Cập nhật đơn hàng thành công').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').delay('1000').trigger('click');
                    }, 1000);
                } else if (data == '1') {
                    $('.ajax-success-ct').html('Đơn hàng đã chuyển sang trạng thái thành công').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').delay('1000').trigger('click');
                    }, 1000);
                } else if (data == '2') {
                    $('.ajax-success-ct').html('Đơn hàng đã chuyển sang trạng thái xác nhận').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').delay('1000').trigger('click');
                    }, 1000);
                } else if (data == '3') {
                    $('.ajax-success-ct').html('Đơn hàng đã chuyển sang trạng thái đang giao hàng').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').delay('1000').trigger('click');
                    }, 1000);
                } else if (data == '4') {
                    $('.ajax-success-ct').html('Đơn hàng đã chuyển sang trạng thái đã giao hàng').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').delay('1000').trigger('click');
                    }, 1000);
                } else if (data == '5') {
                    $('.ajax-success-ct').html('Đơn hàng đã chuyển sang trạng thái hủy').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').delay('1000').trigger('click');
                    }, 1000);
                } else {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function save_receipt_order($order_id) {
    if ($('#receipt_money').val() < 1) {
        $('.ajax-error-ct').html('Vui lòng nhập số tiền thu').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $receipt_money = cms_decode_currency_format($('#receipt_money').val());
        $store_id = $('#store-id').val();
        $receipt_date = $('#receipt_date').val();
        $receipt_method = $("input:radio[name ='payment-method']:checked").val();
        $receipt_note = $('#receipt_note').val();
        $data = {
            'data': {
                'total_money': $receipt_money,
                'store_id': $store_id,
                'receipt_date': $receipt_date,
                'receipt_method': $receipt_method,
                'notes': $receipt_note,
                'order_id': $order_id
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'orders/save_receipt_order/',
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Đã lưu phiếu thu thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_detail_order($order_id);
                    }, 1000);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function save_payment_input($input_id) {
    if ($('#payment_money').val() < 1) {
        $('.ajax-error-ct').html('Vui lòng nhập số tiền thu').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $payment_money = cms_decode_currency_format($('#payment_money').val());
        $store_id = $('#store-id').val();
        $payment_date = $('#payment_date').val();
        $payment_method = $("input:radio[name ='payment-method']:checked").val();
        $payment_note = $('#payment_note').val();
        $data = {
            'data': {
                'total_money': $payment_money,
                'store_id': $store_id,
                'payment_date': $payment_date,
                'payment_method': $payment_method,
                'notes': $payment_note,
                'input_id': $input_id
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'input/save_payment_input/',
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Đã lưu phiếu chi thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_detail_input($input_id);
                    }, 1000);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function save_total_receipt_order_in_customer() {
    if ($('#total_receipt_money').val() < 1) {
        $('.ajax-error-ct').html('Vui lòng nhập số tiền cần thu').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        var $err = false;
        $('tr.order_debt').each(function () {
            var $order_id = $(this).attr('data-id');
            $receipt_money = cms_decode_currency_format($('#receipt_money-' + $order_id).val());
            if ($receipt_money > 0) {
                $store_id = $('#store-id').val();
                $receipt_date = $('#receipt_date').val();
                $receipt_method = $("input:radio[name ='payment-method']:checked").val();
                $receipt_note = $('#receipt_note').val();
                $data = {
                    'data': {
                        'total_money': $receipt_money,
                        'store_id': $store_id,
                        'receipt_date': $receipt_date,
                        'receipt_method': $receipt_method,
                        'notes': $receipt_note,
                        'order_id': $order_id
                    }
                };

                var $param = {
                    'type': 'POST',
                    'url': 'orders/save_receipt_order/',
                    'data': $data,
                    'callback': function (data) {
                        if (data == '0') {
                            $err = true;
                            $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                        }
                    }
                };
                cms_adapter_ajax($param);
            }
        });

        if ($err) {
            $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
        } else {
            $('.ajax-success-ct').html('Đã lưu phiếu thu thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
            setTimeout(function () {
                cms_paging_order_debt_by_customer_id(1);
                $('#total_receipt_money').val(0);
            }, 1000);
        }
    }
}

function save_receipt_order_in_customer($order_id) {
    if ($('#receipt_money-' + $order_id).val() < 1) {
        $('.ajax-error-ct').html('Vui lòng nhập số tiền thu').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $receipt_money = cms_decode_currency_format($('#receipt_money-' + $order_id).val());
        $store_id = $('#store-id').val();
        $receipt_date = $('#receipt_date').val();
        $receipt_method = $("input:radio[name ='payment-method']:checked").val();
        $receipt_note = $('#receipt_note').val();
        $data = {
            'data': {
                'total_money': $receipt_money,
                'store_id': $store_id,
                'receipt_date': $receipt_date,
                'receipt_method': $receipt_method,
                'notes': $receipt_note,
                'order_id': $order_id
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'orders/save_receipt_order/',
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Đã lưu phiếu thu thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_paging_order_debt_by_customer_id(1);
                        $('#total_receipt_money').val(0);
                    }, 1000);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function save_payment_input_in_supplier($input_id) {
    if ($('#payment_money-' + $input_id).val() < 1) {
        $('.ajax-error-ct').html('Vui lòng nhập số tiền chi').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $payment_money = cms_decode_currency_format($('#payment_money-' + $input_id).val());
        $store_id = $('#store-id').val();
        $payment_date = $('#payment_date').val();
        $payment_method = $("input:radio[name ='payment-method']:checked").val();
        $payment_note = $('#payment_note').val();
        $data = {
            'data': {
                'total_money': $payment_money,
                'store_id': $store_id,
                'payment_date': $payment_date,
                'payment_method': $payment_method,
                'notes': $payment_note,
                'input_id': $input_id
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'input/save_payment_input/',
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Đã lưu phiếu chi thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        cms_paging_input_debt_by_supplier_id(1);
                    }, 1000);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function save_total_payment_input_in_supplier() {
    if ($('#total_payment_money').val() < 1) {
        $('.ajax-error-ct').html('Vui lòng nhập số tiền chi').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        var $err = false;
        $('tr.input_debt').each(function () {
            var $input_id = $(this).attr('data-id');
            $payment_money = cms_decode_currency_format($('#payment_money-' + $input_id).val());
            $store_id = $('#store-id').val();
            $payment_date = $('#payment_date').val();
            $payment_method = $("input:radio[name ='payment-method']:checked").val();
            $payment_note = $('#payment_note').val();
            $data = {
                'data': {
                    'total_money': $payment_money,
                    'store_id': $store_id,
                    'payment_date': $payment_date,
                    'payment_method': $payment_method,
                    'notes': $payment_note,
                    'input_id': $input_id
                }
            };

            var $param = {
                'type': 'POST',
                'url': 'input/save_payment_input/',
                'data': $data,
                'callback': function (data) {
                    if (data == '0') {
                        $err = true;
                        $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                    }
                }
            };
            cms_adapter_ajax($param);

        });

        if ($err) {
            $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
        } else {
            $('.ajax-success-ct').html('Đã lưu phiếu chi thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
            setTimeout(function () {
                cms_paging_input_debt_by_supplier_id(1);
                $('#total_payment_money').val(0);
            }, 1000);
        }
    }
}

function cms_save_transfer(type) {
    if ($('tbody#pro_search_append tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui lòng chọn ít nhất 1 sản phẩm cần xuất trước khi lưu đơn hàng. Xin cảm ơn!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $from_store = $('#store-id').val();
        $to_store = $('#to_store').val();
        if ($to_store == '') {
            alert("Vui lòng chọn kho nhận");
        } else if ($from_store == $to_store) {
            alert("Kho nhận và kho xuất không được trùng");
        } else {
            $note = $('#note-order').val();
            $detail = [];
            $('tbody#pro_search_append  tr').each(function () {
                $id = $(this).attr('data-id');
                $value_input = $(this).find('input.quantity_product_order').val();
                $detail.push(
                    {id: $id, quantity: $value_input}
                );
            });

            $data = {
                'data': {
                    'from_store': $from_store,
                    'to_store': $to_store,
                    'notes': $note,
                    'detail_transfer': $detail
                }
            };

            var $param = {
                'type': 'POST',
                'url': 'transfer/cms_save_transfer/',
                'data': $data,
                'callback': function (data) {
                    if (isNaN(parseInt(data))) {
                        $('.ajax-error-ct').html('Không đủ hàng tồn. ' + data).parent().fadeIn().delay(1000).fadeOut('slow');
                    } else if (data == '0') {
                        $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                    } else {
                        if (type == 1) {
                            $('.ajax-success-ct').html('Đã lưu thành công phiếu chuyển kho.').parent().fadeIn().delay(1000).fadeOut('slow');
                            setTimeout(function () {
                                $('.btn-back').delay('1000').trigger('click');
                            }, 1000);
                        } else if (type == 0) {
                            $('.ajax-success-ct').html('Đã khởi tạo thành công phiếu chuyển kho.').parent().fadeIn().delay(1000).fadeOut('slow');
                            cms_vsell_order();
                        } else if (type == 2) {
                            cms_print_transfer_in_create(4, data);
                        } else if (type == 3) {
                            location.reload();
                        } else if (type == 4) {
                            cms_print_order_in_pos(1, data);
                        }
                    }
                }
            };
            cms_adapter_ajax($param);
        }
    }
}

function cms_del_temp_order($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa đơn hàng này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_del_temp_order/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_order($page);
                    $('.ajax-success-ct').html('Xóa đơn hàng thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_temp_payment($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa phiếu chi này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'payment/cms_del_temp_payment/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_payment($page);
                    $('.ajax-success-ct').html('Xóa phiếu chi thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_temp_receipt($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa phiếu thu này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'receipt/cms_del_temp_receipt/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_receipt($page);
                    $('.ajax-success-ct').html('Xóa phiếu thu thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_change_status_order($id, $order_status) {
    var data = {
        'data': {
            'order_status': $order_status
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_change_status_order/' + $id,
        'data': data,
        'callback': function (data) {
            if (data == '1') {
                $('.ajax-success-ct').html('Lưu trạng thái đơn hàng thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                setTimeout(function () {
                    $('.btn-back').delay('1000').trigger('click');
                }, 1000);
            } else if (data == '0') {
                $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_del_temp_transfer($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa phiếu chuyển kho này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'transfer/cms_del_temp_transfer/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    customer_birthday
                    cms_paging_transfer($page);
                    $('.ajax-success-ct').html('Xóa đơn hàng thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_order($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa vĩnh viễn đơn hàng này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_del_order/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_order($page);
                    $('.ajax-success-ct').html('Xóa đơn hàng vĩnh viễn thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_order_in_customer($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa đơn hàng này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'orders/cms_del_temp_order/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_order_by_customer_id($page);
                    $('.ajax-success-ct').html('Xóa đơn hàng thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_input_in_supplier($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa phiếu nhập này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'input/cms_del_temp_import/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_input_by_supplier_id($page);
                    $('.ajax-success-ct').html('Xóa phiếu nhập thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_order($id) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_detail_order/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_edit_order($id) {
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_edit_order/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_transfer($id) {
    var $param = {
        'type': 'POST',
        'url': 'transfer/cms_detail_transfer/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.transfer').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_show_detail_order($id) {
    $('#tr-detail-order-' + $id).toggle(200);
    $('.i-detail-order-' + $id).toggle();
}

function cms_change_discount_order() {
    $('.toggle-discount-order').toggle(200);
}

function cms_show_detail_transfer($id) {
    $('#tr-detail-transfer-' + $id).toggle(200);
    $('.i-detail-transfer-' + $id).toggle();
}

function cms_show_list_order($id) {
    $('#tr-list-order-' + $id).toggle(200);
    $('.i-list-order-' + $id).toggle();
}

function cms_show_detail_input($id) {
    $('#tr-detail-input-' + $id).toggle(200);
    $('.i-detail-input-' + $id).toggle();
}

function cms_detail_order_in_customer($id) {
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_detail_order_in_customer/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.orders-main-body').html(data);
            $('#order_info').text('Chi tiết đơn hàng');
        }
    };
    cms_adapter_ajax($param);
}

function cms_detail_input_in_supplier($id) {
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_detail_input_in_supplier/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.inputs-main-body').html(data);
            $('#input_info').text('Chi tiết phiếu nhập');
        }
    };
    cms_adapter_ajax($param);
}

/*=================== Module Imports ===========================*/
function cms_vsell_input() {
    var $param = {
        'type': 'POST',
        'url': 'input/cms_vsell_input/',
        'data': null,
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_show_product_history($id) {
    $("#myProduct").modal('show');
    $('#modal_product_id').val($id);
    cms_paging_product_history(1);
}

function cms_paging_product_history($page) {
    $product_id = $('#modal_product_id').val();
    $option1 = $('#modal_user_id').val();
    $option2 = $('#modal_store_id').val();
    $option3 = $('#modal_report_type_id').val();
    $date_from = $('#history-search-date-from').val();
    $date_to = $('#history-search-date-to').val();
    $data = {
        'data': {
            'product_id': $product_id,
            'option1': $option1,
            'option2': $option2,
            'option3': $option3,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'product/cms_paging_product_history/' + $page,
        'data': $data,
        'callback': function (data) {
            $('#modal_product_history').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_save_import(type) {
    if ($('tbody#pro_search_append tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui lòng chọn ít nhất 1 sản phẩm cần xuất trước khi lưu hóa đơn nhập. Xin cảm ơn!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $store_id = $('#store-id').val();
        $supplier_id = $('#search-box-mas').attr('data-id');
        $date = $('#date-order').val();
        $note = $('#note-order').val();
        $payment_method = $("input:radio[name ='method-pay']:checked").val();
        $discount = cms_decode_currency_format($('input.discount-import').val());
        $khachdua = cms_decode_currency_format($('.customer-pay').val());
        $detail = [];
        $('tbody#pro_search_append tr').each(function () {
            $price = cms_decode_currency_format($(this).find('input.price-input').val());
            $id = $(this).attr('data-id');
            $quantity = $(this).find('input.quantity_product_import').val();
            $detail.push(
                {id: $id, quantity: $quantity, price: $price}
            );
        });
        if (type == "0")
            $input_status = 0;
        else
            $input_status = 1;

        $data = {
            'data': {
                'supplier_id': $supplier_id,
                'input_date': $date,
                'notes': $note,
                'payment_method': $payment_method,
                'discount': $discount,
                'payed': $khachdua,
                'detail_input': $detail,
                'input_status': $input_status
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'input/cms_save_import/' + $store_id,
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    if (type == 1) {
                        $('.ajax-success-ct').html('Đã lưu thành công phiếu nhập.').parent().fadeIn().delay(1000).fadeOut('slow');
                        setTimeout(function () {
                            $('.btn-back').delay('1000').trigger('click');
                        }, 1000);
                    } else if (type == 0) {
                        $('.ajax-success-ct').html('Đã lưu thành công phiếu nhập tạm.').parent().fadeIn().delay(1000).fadeOut('slow');
                        cms_vsell_input();
                    } else {
                        cms_print_input_in_create(3, data);

                    }
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_update_input($input_id) {
    if ($('tbody#pro_search_append tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui lòng chọn ít nhất 1 sản phẩm cần xuất trước khi lưu hóa đơn nhập. Xin cảm ơn!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $store_id = $('#store-id').val();
        $supplier_id = $('#search-box-mas').attr('data-id');
        $date = $('#date-order').val();
        $note = $('#note-order').val();
        $payment_method = $("input:radio[name ='method-pay']:checked").val();
        $discount = cms_decode_currency_format($('input.discount-import').val());
        $khachdua = cms_decode_currency_format($('.customer-pay').val());
        $detail = [];
        $('tbody#pro_search_append tr').each(function () {
            $price = cms_decode_currency_format($(this).find('input.price-input').val());
            $id = $(this).attr('data-id');
            $quantity = $(this).find('input.quantity_product_import').val();
            $detail.push(
                {id: $id, quantity: $quantity, price: $price}
            );
        });

        $data = {
            'data': {
                'supplier_id': $supplier_id,
                'store_id': $store_id,
                'input_date': $date,
                'notes': $note,
                'payment_method': $payment_method,
                'discount': $discount,
                'payed': $khachdua,
                'detail_input': $detail
            }
        };

        var $param = {
            'type': 'POST',
            'url': 'input/cms_update_input/' + $input_id,
            'data': $data,
            'callback': function (data) {
                if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else {
                    $('.ajax-success-ct').html('Cập nhật phiếu nhập thành công').parent().fadeIn().delay(1000).fadeOut('slow');
                    setTimeout(function () {
                        $('.btn-back').delay('1000').trigger('click');
                    }, 1000);
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_save_order_return($type, $order_id) {
    if ($('tbody#product_return tr').length == 0) {
        $('.ajax-error-ct').html('Xin vui lòng chọn ít nhất 1 sản phẩm cần xuất trước khi lưu hóa đơn trả hàng. Xin cảm ơn!').parent().fadeIn().delay(1000).fadeOut('slow');
    } else {
        $store_id = $('#store-id').val();
        $note = $('#note-order').val();
        $payment_method = $("input:radio[name ='method-pay']:checked").val();
        $discount = cms_decode_currency_format($('input#discount_return').val());
        $customer_pay = cms_decode_currency_format($('input#customer_pay_return').val());
        $detail_return = [];
        $('tbody#product_return tr').each(function () {
            $price = cms_decode_currency_format($(this).find('input.price_return').val());
            $id = $(this).attr('data-id');
            $return_id = $(this).attr('return-id');
            $quantity = $(this).find('input.quantity_return').val();
            $detail_return.push(
                {id: $id, return_id: $return_id, quantity: $quantity, price: $price}
            );
        });

        $detail_sell = [];
        $('tbody#product_sell tr').each(function () {
            $price = cms_decode_currency_format($(this).find('input.price_sell').val());
            $id = $(this).attr('data-id');
            $quantity = $(this).find('input.quantity_sell').val();
            $detail_sell.push(
                {id: $id, quantity: $quantity, price: $price}
            );
        });
        if ($('tbody#product_sell tr').length == 0) {
            $data = {
                'return': {
                    'order_id': $order_id,
                    'notes': $note,
                    'payment_method': $payment_method,
                    'detail_input': $detail_return
                }
            };

            var $param = {
                'type': 'POST',
                'url': 'orders/cms_save_order_return/' + $store_id,
                'data': $data,
                'callback': function (data) {
                    if (data == '0') {
                        $('.ajax-error-ct').html('Đơn hàng này đã trả hết hàng. Vui lòng chọn đơn hàng khác.').parent().fadeIn().delay(1000).fadeOut('slow');
                    } else {
                        if ($type == 1) {
                            $('.ajax-success-ct').html('Đã lưu thành công phiếu nhập.').parent().fadeIn().delay(1000).fadeOut('slow');
                            setTimeout(function () {
                                $('.btn-back').delay('1000').trigger('click');
                            }, 1000);
                        } else {
                            cms_print_input_in_create(3, data);
                        }
                    }
                }
            };
            cms_adapter_ajax($param);
        } else {
            $data = {
                'return': {
                    'order_id': $order_id,
                    'notes': $note,
                    'payment_method': $payment_method,
                    'detail_input': $detail_return
                }, 'sell': {
                    'notes': $note,
                    'payment_method': $payment_method,
                    'coupon': $discount,
                    'customer_pay': $customer_pay,
                    'detail_order': $detail_sell
                }
            };
            var $param = {
                'type': 'POST',
                'url': 'orders/cms_save_order_return_and_sell/' + $store_id,
                'data': $data,
                'callback': function (data) {
                    if (data == '0') {
                        $('.ajax-error-ct').html('Đơn hàng này đã trả hết hàng. Vui lòng chọn đơn hàng khác.').parent().fadeIn().delay(1000).fadeOut('slow');
                    } else {
                        if ($type == 1) {
                            $('.ajax-success-ct').html('Đã lưu thành công phiếu nhập trả và đơn xuất hàng.').parent().fadeIn().delay(1000).fadeOut('slow');
                            setTimeout(function () {
                                $('.btn-back').delay('1000').trigger('click');
                            }, 1000);
                        } else {
                            cms_print_order_in_create(1, data);
                        }
                    }
                }
            };
            cms_adapter_ajax($param);
        }
    }
}


function cms_selboxstock() {
    "use strict";

    var $param = {
        'type': 'POST',
        'url': 'ajax/cms_selboxstock',
        'data': null,
        'callback': function (data) {
            if (data != '0') {
                $('.stock-selbox').html(data);
            } else {
                $('.stock-selbox').html($html);
            }
        }
    };
    cms_adapter_ajax($param);
}

function cms_del_temp_import($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa phiếu nhập này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'input/cms_del_temp_import/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_input($page);
                    $('.ajax-success-ct').html('Xóa phiếu nhập thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_del_import($id, $page) {
    var conf = confirm('Bạn chắc chắn muốn xóa vĩnh viễn phiếu nhập này?');
    if (conf) {
        var $param = {
            'type': 'POST',
            'url': 'input/cms_del_import/' + $id,
            'data': null,
            'callback': function (data) {
                if (data == '1') {
                    cms_paging_input($page);
                    $('.ajax-success-ct').html('Xóa vĩnh viễn phiếu nhập thành công.').parent().fadeIn().delay(1000).fadeOut('slow');
                } else if (data == '0') {
                    $('.ajax-error-ct').html('Oops! This system is errors! please try again.').parent().fadeIn().delay(1000).fadeOut('slow');
                }
            }
        };
        cms_adapter_ajax($param);
    }
}

function cms_detail_input($id) {
    var $param = {
        'type': 'POST',
        'url': 'input/cms_detail_input/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_edit_input($id) {
    var $param = {
        'type': 'POST',
        'url': 'input/cms_edit_input/',
        'data': {'id': $id},
        'callback': function (data) {
            $('.orders').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_inventory($page) {
    $store_id = $('#store_id').val();
    $keyword = $('.txt-sinventory').val();
    $option1 = $('#prd_group_id').val();
    $option2 = $('#prd_manufacture_id').val();
    $option3 = $('#option_inventory').val();
    $data = {
        'data': {
            'keyword': $keyword,
            'option1': $option1,
            'option2': $option2,
            'option3': $option3,
            'store_id': $store_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'inventory/cms_paging_inventory/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.inventory-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_product($page) {
    $keyword = $('#product-search').val();
    $option1 = $('#search-option-1').val();
    $option2 = $('#prd_group_id').val();
    $option3 = $('#prd_manufacture_id').val();
    $data = {'data': {'option1': $option1, 'option2': $option2, 'option3': $option3, 'keyword': $keyword}};
    var $param = {
        'type': 'POST',
        'url': 'product/cms_paging_product/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.product-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_export_excel($type){
    $keyword = $('#product-search').val();
    $option1 = $('#search-option-1').val();
    $option2 = $('#prd_group_id').val();
    $option3 = $('#prd_manufacture_id').val();
    $data = {'data': {'option1': $option1, 'option2': $option2, 'option3': $option3, 'keyword': $keyword}};
    var $param = {
        'type': 'POST',
        'url': 'product/cms_export_excel/'+$type,
        'data': $data,
        'callback': function (data) {
            window.location=(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_export_excel_input($input_id){
    var $param = {
        'type': 'POST',
        'url': 'input/cms_export_excel/'+$input_id,
        'data': null,
        'callback': function (data) {
            window.location=(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_order($page) {
    $keyword = $('#order-search').val();
    $option1 = $('#search-option-1').val();
    $customer_id = -1;
    $order_status = -1;

    if ($('#customer_id').val() != null)
        $customer_id = $('#customer_id').val();

    if ($('#order_status').val() != null)
        $order_status = $('#order_status').val();

    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'option1': $option1,
            'keyword': $keyword,
            'date_from': $date_from,
            'date_to': $date_to,
            'customer_id': $customer_id,
            'order_status': $order_status
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'orders/cms_paging_order/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.orders-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_debt($page) {
    $keyword = $('#order-search').val();
    $option1 = $('#store_id').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'option1': $option1,
            'keyword': $keyword,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'debt/cms_paging_debt/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.debt-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_payment($page) {
    $keyword = $('#payment-search').val();
    $option1 = $('#search-option-1').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'option1': $option1,
            'keyword': $keyword,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'payment/cms_paging_payment/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.payment-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_receipt($page) {
    $keyword = $('#receipt-search').val();
    $option1 = $('#search-option-1').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'option1': $option1,
            'keyword': $keyword,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'receipt/cms_paging_receipt/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.receipt-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_transfer($page) {
    $keyword = $('#transfer-search').val();
    $option1 = $('#search-option-1').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'option1': $option1,
            'keyword': $keyword,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'transfer/cms_paging_transfer/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.transfer-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_revenue($page) {
    $type = $('[name=revenue]:checked').val();
    $option1 = $('#search-option-1').val();
    $option2 = $('#search-option-2').val();
    $option3 = $('#search-option-3').val();
    $option4 = $('#search-option-4').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'type': $type,
            'option1': $option1,
            'option2': $option2,
            'option3': $option3,
            'option4': $option4,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'revenue/cms_paging_revenue/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.revenue-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_profit($page) {
    $type = $('[name=profit]:checked').val();
    $option1 = $('#search-option-1').val();
    $option2 = $('#search-option-2').val();
    $option3 = $('#search-option-3').val();
    $option4 = $('#search-option-4').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {
        'data': {
            'type': $type,
            'option1': $option1,
            'option2': $option2,
            'option3': $option3,
            'option4': $option4,
            'date_from': $date_from,
            'date_to': $date_to
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'profit/cms_paging_profit/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.profit-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_order_by_customer_id($page) {
    var $ids = $('.tr-item-customer').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));
    $('#receipt_debt_show').show();
    $('.receipt_debt_hide').hide();
    if ($id != null)
        $customer_id = $id;

    $data = {
        'data': {
            'customer_id': $customer_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_paging_order_by_customer_id/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.orders-main-body').html(data);
            $('#order_info').text('Lịch sử mua hàng');
            $('#total_receipt_money').val(0);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_order_debt_by_customer_id($page) {
    var $ids = $('.tr-item-customer').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));
    $('#receipt_debt_show').hide();
    $('.receipt_debt_hide').show();
    if ($id != null)
        $customer_id = $id;

    $data = {
        'data': {
            'customer_id': $customer_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'customer/cms_paging_order_debt_by_customer_id/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.orders-main-body').html(data);
            $('#order_info').text('Thu nợ');
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_input_debt_by_supplier_id($page) {
    var $ids = $('.tr-item-sup').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));
    $('#payment_debt_show').hide();
    $('.payment_debt_hide').show();
    if ($id != null)
        $supplier_id = $id;

    $data = {
        'data': {
            'supplier_id': $supplier_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_paging_input_debt_by_supplier_id/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.inputs-main-body').html(data);
            $('#input_info').text('Chi nợ');
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_input_by_supplier_id($page) {
    var $ids = $('.tr-item-sup').attr('id');
    var $id = parseInt($ids.replace(/[^\d.]/g, ''));
    $('#payment_debt_show').show();
    $('.payment_debt_hide').hide();
    if ($id != null)
        $supplier_id = $id;

    $data = {
        'data': {
            'supplier_id': $supplier_id
        }
    };
    var $param = {
        'type': 'POST',
        'url': 'supplier/cms_paging_input_by_supplier_id/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.inputs-main-body').html(data);
            $('#input_info').text('Lịch sử nhập hàng');
            $('#total_payment_money').val(0);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_input($page) {
    $keyword = $('#input-search').val();
    $option1 = $('#search-option-1').val();
    //$option2 = $('#search-option-2').val();
    //$option3 = $('#search-option-3').val();
    $date_from = $('#search-date-from').val();
    $date_to = $('#search-date-to').val();
    $data = {'data': {'option1': $option1, 'keyword': $keyword, 'date_from': $date_from, 'date_to': $date_to}};
    var $param = {
        'type': 'POST',
        'url': 'input/cms_paging_input/' + $page,
        'data': $data,
        'callback': function (data) {
            $('.imports-main-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}

function cms_paging_group($page) {
    var $param = {
        'type': 'POST',
        'url': 'product/cms_paging_group/' + $page,
        'data': null,
        'callback': function (data) {
            $('.prd_group-body').html(data);
        }
    };
    cms_adapter_ajax($param);
}


function cms_loadListproOption() {
    $('#search-option-1').on('change', function () {
        cms_paging_product(1);
    });

    $('#prd_group_id').on('change', function () {
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_group") { //Compare it and if true
            $('#list-prd-group').modal("show"); //Open Modal
        } else {
            cms_paging_product(1);
        }
    });

    $('#prd_manufacture_id').on('change', function () {
        var opval = $(this).val(); //Get value from select element
        if (opval == "product_manufacture") { //Compare it and if true
            $('#list-prd-manufacture').modal("show"); //Open Modal
        } else {
            cms_paging_product(1);
        }
    });
}

function cms_loadListInvOption() {
    $('#option_inventory').on('change', function () {
        cms_paging_inventory(1);
    });

    $('#prd_group_id').on('change', function () {
        cms_paging_inventory(1);
    });

    $('#store_id').on('change', function () {
        cms_paging_inventory(1);
    });

    $('#prd_manufacture_id').on('change', function () {
        cms_paging_inventory(1);
    });
}

function cms_loadListCusOption() {
    $('#cus-option').on('change', function () {
        cms_paging_listcustomer(1);
    });
}

function cms_loadListSupOption() {
    $('#sup-option').on('change', function () {
        cms_paging_supplier(1);
    });
}

//Eport Exel
function cms_export_inventory() {
    return cms_javascript_redirect('inventory/ExportInventory');
}

function cms_load_infor_order() {
    $total_money = 0;
    $total_quantity = 0;
    $('tbody#pro_search_append tr').each(function () {
        $quantity_product = parseInt($(this).find('input.quantity_product_order').val());
        $price = cms_decode_currency_format($(this).find('input.price-order').val());
        $total = $price * $quantity_product;
        $total_money += $total;
        $total_quantity += $quantity_product;
        $(this).find('td.total-money').text(cms_encode_currency_format($total));
    });

    $('tbody#pro_gift_search_append tr').each(function () {
        $quantity_product_gift = parseInt($(this).find('input.quantity_product_order').val());
        $total_quantity += $quantity_product_gift;
    });

    if ($('#vat').val() > 0) {
        $total_money = $total_money + ($total_money * $('#vat').val()) / 100;
    }

    $('div.total-money').text(cms_encode_currency_format($total_money));
    $('div.total-quantity').text($total_quantity);


    if ($('input.discount-order').val() == '')
        $discount = 0;
    else
        $discount = cms_decode_currency_format($('input.discount-order').val());

    if ($discount > $total_money) {
        $('input.discount-order').val($total_money);
        $discount = $total_money;
    }

    $total_after_discount = $total_money - $discount;

    $('.total-after-discount').text(cms_encode_currency_format($total_after_discount));
    $('input.customer-pay').val(cms_encode_currency_format($total_after_discount));
    $('div.debt').text(0);
}

function cms_load_infor_order_return() {
    $total_price_return = 0;
    $('tbody#product_return tr').each(function () {
        $quantity_product = $(this).find('input.quantity_return').val();
        $price = cms_decode_currency_format($(this).find('input.price_return').val());
        $total = $price * $quantity_product;
        $total_price_return += $total;
        $(this).find('td.total_price_return').text(cms_encode_currency_format($total));
    });

    $total_price_sell = 0;
    $('tbody#product_sell tr').each(function () {
        $quantity_product = $(this).find('input.quantity_sell').val();
        $price = cms_decode_currency_format($(this).find('input.price_sell').val());
        $total = $price * $quantity_product;
        $total_price_sell += $total;
        $(this).find('td.total_price_sell').text(cms_encode_currency_format($total));
    });

    $total_money = $total_price_sell - $total_price_return;
    $('div#total_price_return').text(cms_encode_currency_format($total_money));

    if ($('input#discount_return').val() == '')
        $discount = 0;
    else
        $discount = cms_decode_currency_format($('input#discount_return').val());

    if ($discount > $total_money && $total_money > 0) {
        $('input#discount_return').val($total_money);
        $discount = $total_money;
    }

    $total_after_discount = $total_money - $discount;

    $('div#total_money_return').text(cms_encode_currency_format($total_after_discount));
    $('input#customer_pay_return').val(cms_encode_currency_format($total_after_discount));
    $('div.debt').text(0);
}

function cms_load_infor_import() {

    $total_money = 0;
    $('tbody#pro_search_append tr').each(function () {
        $quantity_product = $(this).find('input.quantity_product_import').val();
        $price = cms_decode_currency_format($(this).find('input.price-input').val());
        $total = $price * $quantity_product;
        $total_money += $total;
        $(this).find('td.total-money').text(cms_encode_currency_format($total));
    });
    $('div.total-money').text(cms_encode_currency_format($total_money));

    if ($('input.discount-import').val() == '')
        $discount = 0;
    else
        $discount = cms_decode_currency_format($('input.discount-import').val());

    if ($discount > $total_money) {
        $('input.discount-import').val($total_money);
        $discount = $total_money;
    }

    $total_after_discount = $total_money - $discount;
    $('.total-after-discount').text(cms_encode_currency_format($total_after_discount));
    $('input.customer-pay').val(cms_encode_currency_format($total_after_discount));
    $('div.debt').text(0);
}

function cms_encode_currency_format(obs) {
    return obs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cms_decode_currency_format(obs) {
    if (obs == '')
        return 0;
    else
        return parseInt(obs.replace(/,/g, ''));
}

function fix_height_sidebar() {
    var wdth_main = $('.main-content').height(),
        wdth_sidebar = $(".sidebar").height();
    if (wdth_main > wdth_sidebar) {
        $('.sidebar').height(wdth_main);
    }
}

function btnClick(beforClick, afterClick) {
    $("body").on('click', beforClick, function () {
        $(afterClick).trigger('click');
    });
}

function is_match(pass1, pass2) {
    if (pass1 == pass2) return true;

    return false;
}

function cms_set_current_week() {
    var curr = new Date;
    var f = new Date;
    var l = new Date;
    var first = curr.getDate() - curr.getDay();
    var last = first + 6;
    var firstday = new Date(f.setDate(first)).toISOString().split('T')[0];
    var lastday = new Date(l.setDate(last)).toISOString().split('T')[0];
    $('#search-date-from').val(firstday);
    $('#search-date-to').val(lastday);
}

function cms_set_current_month() {
    var date = new Date;
    var first = new Date(date.getFullYear(), date.getMonth(), 2);
    var last = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    var firstday = first.toISOString().split('T')[0];
    var lastday = last.toISOString().split('T')[0];
    $('#search-date-from').val(firstday);
    $('#search-date-to').val(lastday);
}

function cms_set_current_quarter() {
    var d = new Date();
    var quarter = Math.floor((d.getMonth() / 3));
    var firstDate = new Date(d.getFullYear(), quarter * 3, 1);
    $('#search-date-from').datepicker("setDate", firstDate);
    $('#search-date-to').datepicker("setDate", new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0));
}

function cms_set_current_year() {
    var date = new Date;
    var first = new Date(date.getFullYear(), 0, 2);
    var last = new Date(date.getFullYear(), 11, 32);
    var firstday = first.toISOString().split('T')[0];
    var lastday = last.toISOString().split('T')[0];
    $('#search-date-from').val(firstday);
    $('#search-date-to').val(lastday);
}

function cms_input_week() {
    cms_set_current_week();
    cms_paging_input(1);
}

function cms_input_month() {
    cms_set_current_month();
    cms_paging_input(1);
}

function cms_input_quarter() {
    cms_set_current_quarter();
    cms_paging_input(1);
}

function cms_payment_week() {
    cms_set_current_week();
    cms_paging_payment(1);
}

function cms_payment_month() {
    cms_set_current_month();
    cms_paging_payment(1);
}

function cms_payment_quarter() {
    cms_set_current_quarter();
    cms_paging_payment(1);
}

function cms_receipt_week() {
    cms_set_current_week();
    cms_paging_receipt(1);
}

function cms_receipt_month() {
    cms_set_current_month();
    cms_paging_receipt(1);
}

function cms_receipt_quarter() {
    cms_set_current_quarter();
    cms_paging_receipt(1);
}

function cms_receipt_year() {
    cms_set_current_year();
    cms_paging_receipt(1);
}

function cms_payment_year() {
    cms_set_current_year();
    cms_paging_payment(1);
}

function cms_debt_week() {
    cms_set_current_week();
    cms_paging_debt(1);
}

function cms_debt_month() {
    cms_set_current_month();
    cms_paging_debt(1);
}

function cms_debt_quarter() {
    cms_set_current_quarter();
    cms_paging_debt(1);
}

function cms_order_week() {
    cms_set_current_week();
    cms_paging_order(1);
}

function cms_order_month() {
    cms_set_current_month();
    cms_paging_order(1);
}

function cms_order_quarter() {
    cms_set_current_quarter();
    cms_paging_order(1);
}

function cms_transfer_week() {
    cms_set_current_week();
    cms_paging_transfer(1);
}

function cms_transfer_month() {
    cms_set_current_month();
    cms_paging_transfer(1);
}

function cms_transfer_quarter() {
    cms_set_current_quarter();
    cms_paging_transfer(1);
}

function cms_revenue_all_week() {
    cms_set_current_week();
    cms_paging_revenue(1);
}

function cms_revenue_all_month() {
    cms_set_current_month();
    cms_paging_revenue(1);
}

function cms_revenue_all_quarter() {
    cms_set_current_quarter();
    cms_paging_revenue(1);
}

function cms_profit_all_week() {
    cms_set_current_week();
    cms_paging_profit(1);
}

function cms_profit_all_month() {
    cms_set_current_month();
    cms_paging_profit(1);
}

function cms_profit_all_quarter() {
    cms_set_current_quarter();
    cms_paging_profit(1);
}

function cms_edit_usitem(id) {
    // alert('Chức năng cập nhật người dùng bị khóa do đây là tài khoản demo');
    $('tr.tr-item-' + id).hide();
    cms_selboxgroup();
    $('tr.edit-tr-item-' + id).show();
}

function cms_edit_store(id) {
    $('tr.tr-item-' + id).hide();
    $('tr.edit-tr-item-' + id).show();
}

function cms_undo_item(id) {
    $('tr.edit-tr-item-' + id).hide();
    $('tr.tr-item-' + id).show();
}

function tab_click_act(act) {
    $('.act').not(this).hide();
    $('.' + act + '-act').show();
}

function cms_javascript_redirect(url) {
    window.location.assign(url);
}

function cms_javascrip_fullURL() {
    return window.location.href;
}

function cms_edit_cusitem(obj) {
    $('.btn-hide-edit').hide();
    $('.btn-show-edit').show();
    $('.tr-item-' + obj).hide();
    $('.tr-edit-item-' + obj).show();
}

function cms_undo_cusitem(obj) {
    $('.btn-hide-edit').show();
    $('.btn-show-edit').hide();
    $('.tr-item-' + obj).show();
    $('.tr-edit-item-' + obj).hide();
}

function cms_edit_prd($module, id) {
    $('.prd_' + $module + '-body tr.tr-item-' + id).hide();
    $('.prd_' + $module + '-body tr.edit-tr-item-' + id).show();
}

function cms_get_valCheckbox(obj, type) {
    var vals = 0;
    var types = (type == 'class') ? '.' : '#';
    if ($(types + obj).prop('checked') == true) {
        vals = 1;
    }

    return vals;
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function cms_del_icon_click(obs, attach) {
    $('body').on('click', obs, function () {
        if (obs == '.del-cys') {
            $(this).html('').parent().find(attach).val('').removeAttr('data-id').prop('readonly', false);
            resetAutocomplete_order();
        } else {
            $(this).html('').parent().find(attach).val('').removeAttr('data-id').prop('readonly', false);
        }

    })
}