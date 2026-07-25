package com.ali.rn211.client;

import org.lwjgl.glfw.GLFW;

import com.mojang.blaze3d.platform.InputConstants;

import net.minecraft.client.Minecraft;
// import net.minecraft.client.gui.screens.inventory.AbstractContainerScreen;
import net.minecraft.client.gui.screens.inventory.ContainerScreen;
import net.minecraft.world.inventory.ClickType;

public class SellManager {

    // private static final int SELL_START = 0;
    // private static final int SELL_END = 44;

    private static final int SELL_BUTTON = 53;

    private static final int INVENTORY_START = 54;
    private static final int INVENTORY_END = 89;

    private static boolean selling = false;
    private static long nextActionTime = 0;

    // private static void setShift(boolean pressed) {

    //     Minecraft client = Minecraft.getInstance();

    //     client.options.keyShift.setDown(pressed);

    // }

    // private static void testShiftDoubleClick(Minecraft client) {

    //     var menu = client.player.containerMenu;

    //     setShift(true);

    //     client.gameMode.handleInventoryMouseClick(
    //             menu.containerId,
    //             55,
    //             0,
    //             ClickType.PICKUP,
    //             client.player);

    //     client.gameMode.handleInventoryMouseClick(
    //             menu.containerId,
    //             56,
    //             0,
    //             ClickType.PICKUP,
    //             client.player);

    //     client.gameMode.handleInventoryMouseClick(
    //             menu.containerId,
    //             56,
    //             0,
    //             ClickType.PICKUP,
    //             client.player);

    //     setShift(false);

    // }

    public static void tick(Minecraft client) {

        if (!(client.screen instanceof ContainerScreen screen))
            return;

        if (!screen.getTitle().getString().equals("Sell"))
            return;

        if (client.player == null || client.gameMode == null) {
            return;
        }

        long now = System.currentTimeMillis();

        if (now < nextActionTime) {
        return;
        }

        var menu = screen.getMenu();

        // Move inventory items to sell slots
        if (!selling) {

        for (int slot = INVENTORY_START; slot <= INVENTORY_END; slot++) {

        // if (!menu.slots.get(slot).getItem().isEmpty()) {

        client.gameMode.handleInventoryMouseClick(
        menu.containerId,
        slot,
        0,
        ClickType.QUICK_MOVE,
        client.player);

        // nextActionTime = now + 200;
        // return;
        // }
        }
        // nextActionTime = now + 500;
        // if (now >= nextActionTime) {
        // No items left, ready to sell
        selling = true;
        // nextActionTime = now + 500;
        // return;
        // }

        }

        // Click sell button
        if (selling) {

        client.gameMode.handleInventoryMouseClick(
        menu.containerId,
        SELL_BUTTON,
        0,
        ClickType.PICKUP,
        client.player);

        selling = false;
        // nextActionTime = now + 3000;
        }

        // if (!selling) {

        //     testShiftDoubleClick(client);

        //     selling = true;

        // }
    }
}

// public class SellManager {

// private static final int SELL_START = 0;
// private static final int SELL_END = 44;

// private static final int SELL_BUTTON = 53;

// private static final int INVENTORY_START = 54;
// private static final int INVENTORY_END = 89;

// private static boolean selling = false;
// private static long nextActionTime = 0;

// public static void tick(Minecraft client) {

// if (!(client.screen instanceof ContainerScreen screen))
// return;

// if (!screen.getTitle().getString().equals("Sell"))
// return;

// if (client.player == null || client.gameMode == null) {
// return;
// }

// boolean sellAreaFull = true;
// var menu = screen.getMenu();

// for (int i = 0; i <= 44; i++) {
// if (menu.slots.get(i).getItem().isEmpty()) {
// sellAreaFull = false;
// break;
// }
// }

// if (!sellAreaFull) {

// for (int i = 54; i <= 89; i++) {

// if (!menu.slots.get(i).getItem().isEmpty()) {

// client.gameMode.handleInventoryMouseClick(
// menu.containerId,
// i,
// 0,
// ClickType.QUICK_MOVE,
// client.player);

// return;
// }
// }

// } else {

// // sell button
// client.gameMode.handleInventoryMouseClick(
// menu.containerId,
// 53,
// 0,
// ClickType.PICKUP,
// client.player);
// }
// }
// }
