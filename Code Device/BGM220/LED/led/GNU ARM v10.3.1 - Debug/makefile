################################################################################
# Automatically-generated file. Do not edit!
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include vscode-build/sdk/platform/service/system/src/subdir.mk
-include vscode-build/sdk/platform/service/device_init/src/subdir.mk
-include vscode-build/sdk/platform/emlib/src/subdir.mk
-include vscode-build/sdk/platform/common/toolchain/src/subdir.mk
-include vscode-build/sdk/platform/common/src/subdir.mk
-include vscode-build/sdk/platform/Device/SiliconLabs/BGM22/Source/subdir.mk
-include vscode-build/obj/autogen/subdir.mk
-include vscode-build/obj/subdir.mk
-include gecko_sdk_4.3.0/platform/service/system/src/subdir.mk
-include gecko_sdk_4.3.0/platform/service/device_init/src/subdir.mk
-include gecko_sdk_4.3.0/platform/emlib/src/subdir.mk
-include gecko_sdk_4.3.0/platform/common/toolchain/src/subdir.mk
-include gecko_sdk_4.3.0/platform/common/src/subdir.mk
-include gecko_sdk_4.3.0/platform/Device/SiliconLabs/BGM22/Source/subdir.mk
-include autogen/subdir.mk
-include subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
endif

-include ../makefile.defs

OPTIONAL_TOOL_DEPS := \
$(wildcard ../makefile.defs) \
$(wildcard ../makefile.init) \
$(wildcard ../makefile.targets) \


BUILD_ARTIFACT_NAME := led
BUILD_ARTIFACT_EXTENSION := axf
BUILD_ARTIFACT_PREFIX :=
BUILD_ARTIFACT := $(BUILD_ARTIFACT_PREFIX)$(BUILD_ARTIFACT_NAME)$(if $(BUILD_ARTIFACT_EXTENSION),.$(BUILD_ARTIFACT_EXTENSION),)

# Add inputs and outputs from these tool invocations to the build variables 

# All Target
all: main-build

# Main-build Target
main-build: led.axf

# Tool invocations
led.axf: $(OBJS) $(USER_OBJS) makefile objects.mk $(OPTIONAL_TOOL_DEPS)
	@echo 'Building target: $@'
	@echo 'Invoking: GNU ARM C Linker'
	arm-none-eabi-gcc -g -gdwarf-2 -mcpu=cortex-m33 -mthumb -T "H:\Download\BGM220\LED\led\autogen\linkerfile.ld" -Xlinker --gc-sections -Xlinker -Map="led.map" -mfpu=fpv5-sp-d16 -mfloat-abi=hard --specs=nano.specs -o led.axf -Wl,--start-group "./app.o" "./main.o" "./autogen/sl_device_init_clocks.o" "./autogen/sl_event_handler.o" "./gecko_sdk_4.3.0/platform/Device/SiliconLabs/BGM22/Source/startup_bgm22.o" "./gecko_sdk_4.3.0/platform/Device/SiliconLabs/BGM22/Source/system_bgm22.o" "./gecko_sdk_4.3.0/platform/common/src/sl_assert.o" "./gecko_sdk_4.3.0/platform/common/toolchain/src/sl_memory.o" "./gecko_sdk_4.3.0/platform/emlib/src/em_cmu.o" "./gecko_sdk_4.3.0/platform/emlib/src/em_core.o" "./gecko_sdk_4.3.0/platform/emlib/src/em_emu.o" "./gecko_sdk_4.3.0/platform/emlib/src/em_gpio.o" "./gecko_sdk_4.3.0/platform/emlib/src/em_msc.o" "./gecko_sdk_4.3.0/platform/emlib/src/em_system.o" "./gecko_sdk_4.3.0/platform/service/device_init/src/sl_device_init_dcdc_s2.o" "./gecko_sdk_4.3.0/platform/service/device_init/src/sl_device_init_emu_s2.o" "./gecko_sdk_4.3.0/platform/service/device_init/src/sl_device_init_hfxo_s2.o" "./gecko_sdk_4.3.0/platform/service/device_init/src/sl_device_init_lfxo_s2.o" "./gecko_sdk_4.3.0/platform/service/device_init/src/sl_device_init_nvic.o" "./gecko_sdk_4.3.0/platform/service/system/src/sl_system_init.o" "./gecko_sdk_4.3.0/platform/service/system/src/sl_system_process_action.o" -lgcc -lc -lm -lnosys -Wl,--end-group -Wl,--start-group -lgcc -lc -lnosys -Wl,--end-group
	@echo 'Finished building target: $@'
	@echo ' '

	@echo 'Building out file: led.out'
	arm-none-eabi-objcopy "led.axf" "led.out"
	@echo ' '

	@echo 'Building hex file: led.hex'
	arm-none-eabi-objcopy -O ihex "led.axf" "led.hex"
	@echo ' '

	@echo 'Building bin file: led.bin'
	arm-none-eabi-objcopy -O binary "led.axf" "led.bin"
	@echo ' '

	@echo 'Building s37 file: led.s37'
	arm-none-eabi-objcopy -O srec "led.axf" "led.s37"
	@echo ' '

	@echo 'Running size tool'
	arm-none-eabi-size "led.axf" -A
	@echo ' '

# Other Targets
clean:
	-@$(foreach FILE, $(EXECUTABLES), $(shell $(RM) $(FILE)) )
	-@$(foreach FILE, $(OBJS), $(shell $(RM) $(FILE)) )
	-@$(foreach FILE, $(C_DEPS), $(shell $(RM) $(FILE)) )
	-$(RM) led.axf
	-@echo ' '

.PHONY: all clean dependents main-build

-include ../makefile.targets
