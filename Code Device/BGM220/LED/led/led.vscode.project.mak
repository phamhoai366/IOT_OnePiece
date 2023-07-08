####################################################################
# Automatically-generated file. Do not edit!                       #
# Makefile Version 14                                              #
####################################################################

BASE_SDK_PATH = C:/Users/hieu2/SimplicityStudio/SDKs/gecko_sdk
UNAME:=$(shell $(POSIX_TOOL_PATH)uname -s | $(POSIX_TOOL_PATH)sed -e 's/^\(CYGWIN\).*/\1/' | $(POSIX_TOOL_PATH)sed -e 's/^\(MINGW\).*/\1/')
ifeq ($(UNAME),MINGW)
# Translate "C:/super" into "/C/super" for MinGW make.
SDK_PATH := /$(shell $(POSIX_TOOL_PATH)echo $(BASE_SDK_PATH) | sed s/://)
endif
SDK_PATH ?= $(BASE_SDK_PATH)
COPIED_SDK_PATH ?= gecko_sdk_4.3.0

# This uses the explicit build rules below
PROJECT_SOURCE_FILES =

C_SOURCE_FILES   += $(filter %.c, $(PROJECT_SOURCE_FILES))
CXX_SOURCE_FILES += $(filter %.cpp, $(PROJECT_SOURCE_FILES))
CXX_SOURCE_FILES += $(filter %.cc, $(PROJECT_SOURCE_FILES))
ASM_SOURCE_FILES += $(filter %.s, $(PROJECT_SOURCE_FILES))
ASM_SOURCE_FILES += $(filter %.S, $(PROJECT_SOURCE_FILES))
LIB_FILES        += $(filter %.a, $(PROJECT_SOURCE_FILES))

C_DEFS += \
 '-DDEBUG_EFM=1' \
 '-DBGM220PC22HNA=1' \
 '-DSL_COMPONENT_CATALOG_PRESENT=1'

ASM_DEFS += \
 '-DDEBUG_EFM=1' \
 '-DBGM220PC22HNA=1' \
 '-DSL_COMPONENT_CATALOG_PRESENT=1'

INCLUDES += \
 -Iconfig \
 -Iautogen \
 -I. \
 -I$(SDK_PATH)/platform/Device/SiliconLabs/BGM22/Include \
 -I$(SDK_PATH)/platform/CMSIS/Core/Include \
 -I$(SDK_PATH)/platform/service/device_init/inc \
 -I$(SDK_PATH)/platform/emlib/inc \
 -I$(SDK_PATH)/platform/common/inc \
 -I$(SDK_PATH)/platform/common/toolchain/inc \
 -I$(SDK_PATH)/platform/service/system/inc

GROUP_START =-Wl,--start-group
GROUP_END =-Wl,--end-group

PROJECT_LIBS = \
 -lgcc \
 -lc \
 -lm \
 -lnosys

LIBS += $(GROUP_START) $(PROJECT_LIBS) $(GROUP_END)

LIB_FILES += $(filter %.a, $(PROJECT_LIBS))

C_FLAGS += \
 -mcpu=cortex-m33 \
 -mthumb \
 -mfpu=fpv5-sp-d16 \
 -mfloat-abi=hard \
 -std=c99 \
 -Wall \
 -Wextra \
 -Os \
 -fdata-sections \
 -ffunction-sections \
 -fomit-frame-pointer \
 -imacros sl_gcc_preinclude.h \
 -mcmse \
 --specs=nano.specs \
 -g

CXX_FLAGS += \
 -mcpu=cortex-m33 \
 -mthumb \
 -mfpu=fpv5-sp-d16 \
 -mfloat-abi=hard \
 -std=c++11 \
 -fno-rtti \
 -fno-exceptions \
 -Wall \
 -Wextra \
 -Os \
 -fdata-sections \
 -ffunction-sections \
 -fomit-frame-pointer \
 -imacros sl_gcc_preinclude.h \
 -mcmse \
 --specs=nano.specs \
 -g

ASM_FLAGS += \
 -mcpu=cortex-m33 \
 -mthumb \
 -mfpu=fpv5-sp-d16 \
 -mfloat-abi=hard \
 -imacros sl_gcc_preinclude.h \
 -x assembler-with-cpp

LD_FLAGS += \
 -mcpu=cortex-m33 \
 -mthumb \
 -mfpu=fpv5-sp-d16 \
 -mfloat-abi=hard \
 -T"autogen/linkerfile.ld" \
 --specs=nano.specs \
 -Xlinker -Map=$(OUTPUT_DIR)/$(PROJECTNAME).map \
 -Wl,--gc-sections


####################################################################
# Pre/Post Build Rules                                             #
####################################################################
pre-build:
	# No pre-build defined

post-build: $(OUTPUT_DIR)/$(PROJECTNAME).out
	# No post-build defined

####################################################################
# SDK Build Rules                                                  #
####################################################################
$(OUTPUT_DIR)/sdk/platform/common/src/sl_assert.o: $(SDK_PATH)/platform/common/src/sl_assert.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/common/src/sl_assert.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/common/src/sl_assert.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/common/src/sl_assert.d
OBJS += $(OUTPUT_DIR)/sdk/platform/common/src/sl_assert.o

$(OUTPUT_DIR)/sdk/platform/common/toolchain/src/sl_memory.o: $(SDK_PATH)/platform/common/toolchain/src/sl_memory.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/common/toolchain/src/sl_memory.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/common/toolchain/src/sl_memory.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/common/toolchain/src/sl_memory.d
OBJS += $(OUTPUT_DIR)/sdk/platform/common/toolchain/src/sl_memory.o

$(OUTPUT_DIR)/sdk/platform/Device/SiliconLabs/BGM22/Source/startup_bgm22.o: $(SDK_PATH)/platform/Device/SiliconLabs/BGM22/Source/startup_bgm22.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/Device/SiliconLabs/BGM22/Source/startup_bgm22.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/Device/SiliconLabs/BGM22/Source/startup_bgm22.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/Device/SiliconLabs/BGM22/Source/startup_bgm22.d
OBJS += $(OUTPUT_DIR)/sdk/platform/Device/SiliconLabs/BGM22/Source/startup_bgm22.o

$(OUTPUT_DIR)/sdk/platform/Device/SiliconLabs/BGM22/Source/system_bgm22.o: $(SDK_PATH)/platform/Device/SiliconLabs/BGM22/Source/system_bgm22.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/Device/SiliconLabs/BGM22/Source/system_bgm22.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/Device/SiliconLabs/BGM22/Source/system_bgm22.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/Device/SiliconLabs/BGM22/Source/system_bgm22.d
OBJS += $(OUTPUT_DIR)/sdk/platform/Device/SiliconLabs/BGM22/Source/system_bgm22.o

$(OUTPUT_DIR)/sdk/platform/emlib/src/em_cmu.o: $(SDK_PATH)/platform/emlib/src/em_cmu.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/emlib/src/em_cmu.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/emlib/src/em_cmu.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_cmu.d
OBJS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_cmu.o

$(OUTPUT_DIR)/sdk/platform/emlib/src/em_core.o: $(SDK_PATH)/platform/emlib/src/em_core.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/emlib/src/em_core.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/emlib/src/em_core.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_core.d
OBJS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_core.o

$(OUTPUT_DIR)/sdk/platform/emlib/src/em_emu.o: $(SDK_PATH)/platform/emlib/src/em_emu.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/emlib/src/em_emu.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/emlib/src/em_emu.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_emu.d
OBJS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_emu.o

$(OUTPUT_DIR)/sdk/platform/emlib/src/em_gpio.o: $(SDK_PATH)/platform/emlib/src/em_gpio.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/emlib/src/em_gpio.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/emlib/src/em_gpio.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_gpio.d
OBJS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_gpio.o

$(OUTPUT_DIR)/sdk/platform/emlib/src/em_msc.o: $(SDK_PATH)/platform/emlib/src/em_msc.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/emlib/src/em_msc.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/emlib/src/em_msc.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_msc.d
OBJS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_msc.o

$(OUTPUT_DIR)/sdk/platform/emlib/src/em_system.o: $(SDK_PATH)/platform/emlib/src/em_system.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/emlib/src/em_system.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/emlib/src/em_system.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_system.d
OBJS += $(OUTPUT_DIR)/sdk/platform/emlib/src/em_system.o

$(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_dcdc_s2.o: $(SDK_PATH)/platform/service/device_init/src/sl_device_init_dcdc_s2.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/service/device_init/src/sl_device_init_dcdc_s2.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/service/device_init/src/sl_device_init_dcdc_s2.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_dcdc_s2.d
OBJS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_dcdc_s2.o

$(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_emu_s2.o: $(SDK_PATH)/platform/service/device_init/src/sl_device_init_emu_s2.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/service/device_init/src/sl_device_init_emu_s2.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/service/device_init/src/sl_device_init_emu_s2.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_emu_s2.d
OBJS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_emu_s2.o

$(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_hfxo_s2.o: $(SDK_PATH)/platform/service/device_init/src/sl_device_init_hfxo_s2.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/service/device_init/src/sl_device_init_hfxo_s2.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/service/device_init/src/sl_device_init_hfxo_s2.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_hfxo_s2.d
OBJS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_hfxo_s2.o

$(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_lfxo_s2.o: $(SDK_PATH)/platform/service/device_init/src/sl_device_init_lfxo_s2.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/service/device_init/src/sl_device_init_lfxo_s2.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/service/device_init/src/sl_device_init_lfxo_s2.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_lfxo_s2.d
OBJS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_lfxo_s2.o

$(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_nvic.o: $(SDK_PATH)/platform/service/device_init/src/sl_device_init_nvic.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/service/device_init/src/sl_device_init_nvic.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/service/device_init/src/sl_device_init_nvic.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_nvic.d
OBJS += $(OUTPUT_DIR)/sdk/platform/service/device_init/src/sl_device_init_nvic.o

$(OUTPUT_DIR)/sdk/platform/service/system/src/sl_system_init.o: $(SDK_PATH)/platform/service/system/src/sl_system_init.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/service/system/src/sl_system_init.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/service/system/src/sl_system_init.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/service/system/src/sl_system_init.d
OBJS += $(OUTPUT_DIR)/sdk/platform/service/system/src/sl_system_init.o

$(OUTPUT_DIR)/sdk/platform/service/system/src/sl_system_process_action.o: $(SDK_PATH)/platform/service/system/src/sl_system_process_action.c
	@$(POSIX_TOOL_PATH)echo 'Building $(SDK_PATH)/platform/service/system/src/sl_system_process_action.c'
	@$(POSIX_TOOL_PATH)mkdir -p $(@D)
	$(ECHO)$(CC) $(CFLAGS) -c -o $@ $(SDK_PATH)/platform/service/system/src/sl_system_process_action.c
CDEPS += $(OUTPUT_DIR)/sdk/platform/service/system/src/sl_system_process_action.d
OBJS += $(OUTPUT_DIR)/sdk/platform/service/system/src/sl_system_process_action.o

# Automatically-generated Simplicity Studio Metadata
# Please do not edit or delete these lines!
# SIMPLICITY_STUDIO_METADATA=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=END_SIMPLICITY_STUDIO_METADATA
# END OF METADATA